@foreach ($product->images as $image)
    <img src="{{ asset($image->thumbnail) }}" alt="Hình ảnh sản phẩm">
@endforeach
