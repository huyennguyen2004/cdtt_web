<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Models\ProductStore;
use App\Models\ProductImage;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\OrderDetail;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('category', 'product.category_id', '=', 'category.id')
            ->join('brand', 'product.brand_id', '=', 'brand.id')
            ->with(['category:id,name', 'brand:id,name', 'images'])
            ->orderBy('product.created_at', 'DESC')
            ->select(
                'product.id',
                'product.name',
                'product.pricebuy',
                'product.status',
                'product.slug',
                'product.description',
                'category.name as catname',
                'brand.name as brandname'
            )
            ->get();

        foreach ($products as $product) {
            foreach ($product->images as $image) {
                $image->thumbnail = url($image->thumbnail);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ]);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function getBrands()
    {
        $brands = Brand::all();
        return response()->json($brands);
    }
    public function show($id)
    {
        $product = Product::with(['images', 'category', 'brand'])->find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại',
            ], 404);
        }
        foreach ($product->images as $image) {
            $image->thumbnail = url($image->thumbnail);
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->pricebuy,
                'status' => $product->status,
                'catname' => $product->category->name,
                'brandname' => $product->brand->name,
                'images' => $product->images
            ],
        ]);
    }
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }
        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::slug($request->name, '-');
        $product->detail = $request->detail;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->pricebuy = $request->pricebuy;
        $product->created_by = 1;
        $product->status = $request->status;
        $product->created_at = now();

        $product->save();
        // if ($product->save()) {
        //     if ($request->thumbnail) {
        //         foreach ($request->thumbnail as $file) {
        //             $productimage = new ProductImage();
        //             $productimage->product_id = $product->id;
        //             $exten = $file->extension();
        //             $imageName = $product->slug . date('YmdHis') . "." . $exten;
        //             $file->move(public_path('images/product'), $imageName);
        //             $productimage->thumbnail = $imageName;
        //             $productimage->save();
        //         }
        //     }
        $result = [
            'status' => true,
            'message' => 'Thêm mới sản phẩm thành công',
            'product' => $product,
        ];

        return response()->json($result);
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:category,id',
            'brand_id' => 'required|integer|exists:brand,id',
            'pricebuy' => 'required|numeric',
            'detail' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'thumbnail.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);

            $product->name = $request->name;
            $product->slug = Str::slug($request->name, '-');
            $product->detail = $request->detail;
            $product->description = $request->description;
            $product->category_id = $request->category_id;
            $product->brand_id = $request->brand_id;
            $product->pricebuy = $request->pricebuy;
            $product->status = $request->status;

            // Cập nhật hình ảnh nếu có
            if ($request->hasFile('thumbnail')) {
                // Xóa các hình ảnh cũ nếu cần
                ProductImage::where('product_id', $product->id)->delete();

                foreach ($request->file('thumbnail') as $file) {
                    $productImage = new ProductImage();
                    $productImage->product_id = $product->id;

                    $imageName = $product->slug . date('YmdHis') . "." . $file->extension();
                    $file->move(public_path('images/product'), $imageName);
                    $productImage->thumbnail = 'images/product/' . $imageName;
                    $productImage->save();
                }
            }

            $product->save();

            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật sản phẩm thành công',
                'product' => $product,
                'images' => $product->images,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Lỗi khi cập nhật sản phẩm: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Cập nhật sản phẩm thất bại',
            ], 500);
        }
    }

    public function product_new($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');

        $products = Product::where('product.status', '=', 1)
            ->joinSub($subproductstore, 'product_store', function ($join) {
                $join->on('product.id', '=', 'product_store.product_id');
            })
            ->leftJoin('product_sale', function ($join) {
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('product.id', '=', 'product_sale.product_id')
                    ->where([
                        ['product_sale.date_begin', '<=', $today],
                        ['product_sale.date_end', '>=', $today],
                        ['product_sale.status', '=', 1]
                    ]);
            })
            ->with('images')
            ->orderBy('product.created_at', 'DESC')
            ->select("product.id", "product.name", "product.pricebuy", "product.slug", "product_sale.price_sale")
            ->limit($limit)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ]);
    }

    public function product_sale($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');

        $products = Product::where('product.status', '=', 1)
            ->joinSub($subproductstore, 'product_store', function ($join) {
                $join->on('product.id', '=', 'product_store.product_id');
            })
            ->join('product_sale', function ($join) {
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('product.id', '=', 'product_sale.product_id')
                    ->where([
                        ['product_sale.datebegin', '<=', $today],
                        ['product_sale.dateend', '>=', $today],
                        ['product_sale.status', '=', 1]
                    ]);
            })
            ->with('images')
            ->orderBy('product_sale.pricesale', 'DESC')
            ->select(
                "product.id",
                "product.name",
                "product.pricebuy",
                "product.slug",
                "product_sale.pricesale"
            )
            ->limit($limit)
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ];

        return response()->json($result);
    }
    public function product_bestseller($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');

        $suborderdetail = OrderDetail::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');

        $products = Product::where('product.status', '=', 1)
            ->joinSub($subproductstore, 'product_store', function ($join) {
                $join->on('product.id', '=', 'product_store.product_id');
            })
            ->joinSub($suborderdetail, 'orderdetail', function ($join) {
                $join->on('product.id', '=', 'orderdetail.product_id');
            })
            ->leftJoin('product_sale', function ($join) {
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('product.id', '=', 'product_sale.product_id')
                    ->where([
                        ['product_sale.datebegin', '<=', $today],
                        ['product_sale.dateend', '>=', $today],
                        ['product_sale.status', '=', 1]
                    ]);
            })
            ->with('images')
            ->orderBy('orderdetail.qty', 'DESC')
            ->select(
                "product.id",
                "product.name",
                "product.pricebuy",
                "product.slug",
                "product_sale.price_sale",
                "orderdetail.qty"
            )
            ->limit($limit)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ]);
    }

    public function getListCategoryId($category_id)
    {
        $list = [$category_id];
        $list_cat1 = Category::where([['status', '=', 1], ['parent_id', '=', $category_id]])->get();

        foreach ($list_cat1 as $row_cat1) {
            $list[] = $row_cat1->id;
            $list_cat2 = Category::where([['status', '=', 1], ['parent_id', '=', $row_cat1->id]])->get();
            foreach ($list_cat2 as $row_cat2) {
                $list[] = $row_cat2->id;
            }
        }

        return $list;
    }

    public function product_all($category_id = null, $brand_id = null, $price_min = 0, $price_max = 9999999999)
    {
        $where_args = [['product.status', '=', 1]];

        if ($brand_id !== null) {
            $where_args[] = ['product.brand_id', '=', $brand_id];
        }
        if ($category_id !== null) {
            $list_category_ids = $this->getListCategoryId($category_id);
            $where_args[] = ['product.category_id', 'in', $list_category_ids];
        }

        $products = Product::where($where_args)
            ->whereBetween('product.pricebuy', [$price_min, $price_max])
            ->with(['category:id,name', 'brand:id,name', 'images'])
            ->orderBy('product.created_at', 'DESC')
            ->select(
                'product.id',
                'product.name',
                'product.pricebuy',
                'product.status',
                'product.slug',
                'product.description'
            )
            ->get();

        foreach ($products as $product) {
            foreach ($product->images as $image) {
                $image->thumbnail = url($image->thumbnail);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ]);
    }
    public function getProductsByCategory($id)
    {
        $products = Product::where('category_id', $id)->get();
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }
        return response()->json($products);
    }
}