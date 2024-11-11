<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:category,id',
            'brand_id' => 'required|integer|exists:brand,id',
            'pricebuy' => 'required|numeric',
            'detail' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            // 'thumbnail.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}