<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Lấy danh sách tất cả các bài viết
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    // Tạo một bài viết mới
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }

        $post = new Post();
        $post->title = $request->title;
        $post->slug = Str::slug($request->title);
        $post->description = $request->description;
        $post->content = $request->content;
        $post->topic_id = $request->topic_id;
        $post->type = $request->type;
        $post->status = $request->status;
        $post->created_at = date('Y-m-d H:i:s');
        $post->created_by = Auth::id() ?? 1;

        $post->save();
        return response()->json([
            'success' => true,
            'message' => 'Bài viết đã được tạo thành công',
            'post' => $post
        ], 200);
    }

    // Lấy thông tin một bài viết theo ID
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    // Cập nhật thông tin một bài viết theo ID
    public function update(UpdatePostRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->validated());
        return response()->json($post);
    }

    // Xóa một bài viết theo ID
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(null, 204); // 204: No Content
    }
}
