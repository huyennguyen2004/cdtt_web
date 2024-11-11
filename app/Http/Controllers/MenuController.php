<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    // 1. Hiển thị danh sách các Menu
    public function index()
    {
        $menus = Menu::all(); // Lấy tất cả các menu từ cơ sở dữ liệu
        return response()->json($menus);
    }

    // 2. Tạo Menu mới
    public function store(Request $request)
    {
        // Kiểm tra tính hợp lệ của dữ liệu
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus',
            'description' => 'nullable|string',
            'status' => 'required|in:published,unpublished',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Tạo menu mới
        $menu = Menu::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json($menu, 201); // Trả về menu vừa tạo với mã trạng thái 201
    }

    public function show($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['message' => 'Menu not found'], 404);
        }
        $menu->status = $menu->status == 1 ? 'xuất bản' : 'chưa xuất bản';
        return response()->json($menu);
    }



    // 4. Cập nhật một Menu
    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json(['message' => 'Menu không tồn tại'], 404);
        }

        // Kiểm tra tính hợp lệ của dữ liệu
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus,slug,' . $id,
            'description' => 'nullable|string',
            'status' => 'required|in:xuất bản,chưa xuất bản',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Cập nhật thông tin menu
        $menu->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json($menu);
    }

    // 5. Xóa một Menu
    public function destroy($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json(['message' => 'Menu không tồn tại'], 404);
        }

        $menu->delete();

        return response()->json(['message' => 'Xóa menu thành công']);
    }
}
