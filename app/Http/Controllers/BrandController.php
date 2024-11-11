<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class BrandController extends Controller
{

    public function index()
    {
        $brands = Brand::all();
        return response()->json($brands);
    }

    public function store(StoreBrandRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name);
        $brand->description = $request->description;
        $brand->status = $request->status;
        $brand->created_at = now();
        $brand->created_by = Auth::id() ?? 1;

        $brand->save();

        return response()->json(['message' => 'Brand added successfully', 'brand' => $brand], 201);
    }

    public function show($id)
    {
        $brand = Brand::findOrFail($id);
        return response()->json($brand);
    }

    public function update(UpdateBrandRequest $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name);
        $brand->description = $request->description;
        $brand->status = $request->status;
        $brand->updated_at = now();
        $brand->updated_by = Auth::id() ?? 1;

        $brand->save();

        return response()->json([
            'success' => true,
            'message' => 'Brand updated successfully!',
            'brand' => $brand
        ]);
    }

    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();
        return response()->json(null, 204);
    }
}
