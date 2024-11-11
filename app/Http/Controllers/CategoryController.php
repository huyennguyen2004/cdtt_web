<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return response()->json(['categories' => $categories]);
    }

    public function category_list($parentId = null)
    {
        $categories = Category::where('parent_id', $parentId)->with('subcategories')->get();
        return response()->json(['categories' => $categories]);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category);
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug ?? Str::slug($request->name);
        $category->description = $request->description;
        $category->status = $request->status;
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        $category->created_by = Auth::id() ?? 1;

        $category->save();
        return response()->json(['category' => $category, 'message' => 'Category created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'category not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->description = $request->description;
        $category->status = $request->status;
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        $category->updated_at = now();
        $category->updated_by = Auth::id() ?? 1;

        $category->save();

        return response()->json([
            'success' => true,
            'message' => 'category updated successfully!',
            'category' => $category
        ]);
    }



    public function delete($id)
    {
        $category = Category::findOrFail($id);
        $category->SoftDelete();
        return response()->json(['message' => 'Category moved to trash']);
    }

    public function trash()
    {
        $trashedcategories = Category::onlyTrashed()->get();
        return response()->json([
            'success' => true,
            'category' => $trashedcategories
        ]);
    }
    public function restore($id)
    {
        $category = Category::withTrashed()->findOrFail($id);
        $category->restore();
        return response()->json([
            'success' => true,
            'message' => 'category restored successfully!'
        ]);
    }


    public function destroy($id)
    {
        $topic = Category::withTrashed()->find($id);

        if (!$topic) {
            return response()->json([
                'success' => false,
                'message' => 'category not found'
            ], 404);
        }

        $topic->forceDelete();
        return response()->json([
            'success' => true,
            'message' => 'category deleted permanently!'
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
