<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductStore;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductStoreRequest;
use App\Http\Requests\UpdateProductStoreRequest;
use Illuminate\Support\Facades\Auth;

class ProductStoreController extends Controller
{
    public function index()
    {
        $products_store = Product::where('product.status', '!=', 0)
            ->join('category', 'product.category_id', '=', 'category.id')
            ->join('brand', 'product.brand_id', '=', 'brand.id')
            ->rightJoin('product_store', 'product.id', '=', 'product_store.product_id')
            ->with('images')
            ->orderBy('product_store.created_at', 'DESC')
            ->select(
                'product.id',
                'product.name',
                'product_store.dateimport',
                'product.status',
                'category.name as catname',
                'brand.name as brandname',
                'product_store.priceroot',
                'product_store.qty'
            )
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productstores' => $products_store,
            'total' => $products_store->count()
        ];
        return response()->json($result);
    }

    public function store(StoreProductStoreRequest $request)
    {
        try {
            $validated = $request->validated();

            $productStore = new ProductStore();
            $productStore->product_id = $request->product_id;
            $productStore->priceroot = $request->priceroot;
            $productStore->qty = $request->qty;
            $productStore->dateimport = $request->dateimport;
            $productStore->created_at = now();
            $productStore->created_by = Auth::id() ?? 1;

            $productStore->save();

            return response()->json([
                'status' => true,
                'message' => 'Thêm mới sản phẩm thành công',
                'product' => $productStore,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi lưu sản phẩm',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {

        $productstore = ProductStore::with('product')
            ->findOrFail($id);

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productstore' => [
                'id' => $productstore->id,
                'product_id' => $productstore->product_id,
                'name' => $productstore->product->name,
                'priceroot' => $productstore->priceroot,
                'qty' => $productstore->qty,
                'dateimport' => $productstore->dateimport,
                'created_at' => $productstore->created_at,
                'created_by' => $productstore->created_by,
                'status' => $productstore->status,
            ]
        ];

        return response()->json($result);
    }


}
