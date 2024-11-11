<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    public function show($id)
    {
        $orderDetails = DB::table('order')
            ->join('orderdetail', 'order.id', '=', 'orderdetail.order_id')
            ->join('product', 'orderdetail.product_id', '=', 'product.id')
            ->where('order.id', $id)
            ->select(
                'order.id as order_id',
                'order.name',
                'order.phone',
                'order.email',
                'order.address',
                'order.note',
                'product.name as product_name',
                'orderdetail.qty',
                'orderdetail.price',
                'orderdetail.discount'
            )
            ->get();

        if ($orderDetails->isEmpty()) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['order' => $orderDetails]);
    }

    public function delete($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

    }
    public function trash()
    {
        $trashedorders = Order::onlyTrashed()->get();
        return response()->json([
            'success' => true,
            'orders' => $trashedorders
        ]);
    }
    public function restore($id)
    {
        $order = Order::withTrashed()->findOrFail($id);
        $order->restore();
        return response()->json([
            'success' => true,
            'message' => 'order restored successfully!'
        ]);
    }

    public function destroy($id)
    {
        $order = Order::withTrashed()->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'order not found'
            ], 404);
        }

        $order->forceDelete();
        return response()->json([
            'success' => true,
            'message' => 'order deleted permanently!'
        ]);
    }

}
