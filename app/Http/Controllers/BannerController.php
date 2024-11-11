<?php

namespace App\Http\Controllers;
use App\Models\Banner;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::where('status', '!=', 0)
            ->orderBy('sort_order', 'ASC')
            ->select("id", "name", "image", "status", "position", "link")
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'banners' => $banners
        ];
        return response()->json($result);
    }

    public function trash()
    {
        $banners = Banner::where('status', '=', 0)
            ->orderBy('sort_order', 'ASC')
            ->select("id", "name", "image", "status", "position")
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'banners' => $banners
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'banner' => $banner
            ];
        }
        return response()->json($result);
    }

    public function store(StoreBannerRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }

        $banner = new Banner();
        $banner->name = $request->name;
        $banner->link = $request->link;
        $banner->position = $request->position;
        $banner->sort_order = $request->sort_order;
        $banner->created_at = date('Y-m-d H:i:s');
        $banner->created_by = Auth::id() ?? 1;
        $banner->status = $request->status;

        $banner->save();
        return response()->json([
            'success' => true,
            'message' => 'Banner added successfully',
            'banner' => $banner
        ], 201);
    }

    public function update(UpdateBannerRequest $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thầy thông tín',
                'banner' => null
            ];
            return response()->json($result);
        }
        $banner->name = $request->name;
        $banner->position = $request->position;
        $banner->sort_order = $request->sort_order;
        $banner->link = $request->link;
        $banner->updated_by = 1;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->status = $request->status;
        if ($banner->save()) {
            $result = [
                'status' => true,
                'message' => 'Cập nhật thành công',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể cập nhật',
                'banner' => null
            ];
        }
        return response()->json($result);
    }

    public function status($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thầy thông tin',
                'banner' => null
            ];
            return response()->json($result);
        }
        $banner->status = ($banner->status == 1) ? 2 : 1;
        $banner->updated_by = 1;
        $banner->updated_at = date('Y-m-d H:i:s');
        if ($banner->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'banner' => null
            ];
        }
        return response()->json($result);
    }
    //xóa vào thùng rác
    public function delete($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thầy thông tin',
                'banner' => null
            ];
            return response()->json($result);
        }
        $banner->status = 0;
        $banner->updated_by = 1;
        $banner->updated_at = date('Y-m-d H:i:s');
        if ($banner->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'banner' => null
            ];
        }
        return response()->json($result);
    }
    //khôi phục từ thùng rác
    public function restore($id)
    {

        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thầy thông tin',
                'banner' => null
            ];
            return response()->json($result);
        }
        $banner->status = 2;
        $banner->updated_by = 1;
        $banner->updated_at = date('Y-m-d H:i:s');
        if ($banner->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'banner' => null
            ];
        }
        return response()->json($result);
    }
    //xóa khỏi csdl
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thầy thông tin',
                'banner' => null
            ];
            return response()->json($result);
        }
        if ($banner->delete()) {
            $result = [
                'status' => true,
                'message' => 'Xóa thành công',
                'banner' => $banner
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể xóa',
                'banner' => null
            ];
        }
        return response()->json($result);
    }
}
