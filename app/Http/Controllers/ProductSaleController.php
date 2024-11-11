<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductSaleRequest;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductStore;
use App\Models\Orderdetail;
use App\Models\ProductSale;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ProductSaleController extends Controller
{
    public function index()
    {
        $products_sale = Product::where('product.status', '!=', 0)
            ->rightJoin('product_sale', 'product.id', '=', 'product_sale.product_id')
            ->with('images')
            ->orderBy('product_sale.created_at', 'DESC')
            ->select(
                'product.id',
                'product.name',
                'product.status',
                'product_sale.pricesale',
                'product_sale.datebegin',
                'product_sale.dateend'
            )
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productsale' => $products_sale,
            'total' => count($products_sale)
        ];

        return response()->json($result);
    }
    public function show($id)
    {
        $product_sale = ProductSale::where('id', $id)->first();
        if (!$product_sale) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'product' => [
                'id' => $product_sale->id,
                'name' => $product_sale->product_id,
                'pricesale' => $product_sale->pricesale,
                'datebegin' => $product_sale->datebegin,
                'dateend' => $product_sale->dateend,
                'status' => $product_sale->status,
            ],
        ]);
    }
    public function store(StoreProductSaleRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }
        $productSale = new ProductSale();
        $productSale->product_id = $request->product_id;
        $productSale->pricesale = $request->pricesale;
        $productSale->datebegin = $request->datebegin;
        $productSale->dateend = $request->dateend;
        $productSale->created_at = now();
        $productSale->created_by = Auth::id() ?? 1;

        $productSale->save();

        $result = [
            'status' => true,
            'message' => 'Thêm mới sản phẩm thành công',
            'product' => $productSale,
        ];

        return response()->json($result);
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
                "product.price",
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

        $suborderdetail = Orderdetail::select('product_id', DB::raw('SUM(qty) as qty'))
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
                "product.price",
                "product.slug",
                "product_sale.pricesale",
                "orderdetail.qty"
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
}
