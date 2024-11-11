<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductSaleRequest extends FormRequest
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
            'product_id' => 'required|exists:product,id',
            'pricesale' => 'required|numeric|min:1',
            'datebegin' => 'required|date|before_or_equal:dateend',
            'dateend' => 'required|date|after_or_equal:datebegin',
        ];
    }
}
