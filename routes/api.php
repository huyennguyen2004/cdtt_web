<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\ProductStoreController;


Route::get('/user', function (Request $request) {
    return $request->user();
});

//route trang người dùng
// UC1. Cấu hình
Route::get('config_web', [ConfigController::class, 'config_web']);
// UC2: Menu (menu_ list/vị trí/cấp/giới hạn)
Route::get('menu/', [MenuController::class, 'menu']);
// UC3: Slideshow (slider_ list/vị trí/giới hạn)
Route::get('banner/{position}', [BannerController::class, 'banner']);
// UC4: Sản phẩm mới (product_new/ giới hạn)
Route::get('product_new/{limit}', [ProductController::class, 'product_new']);
// UC5: Sản phẩm khuyến mãi (product_sale/giới hạn)
Route::get('product_sale/{limit}', [ProductController::class, 'product_sale']);
// UC6: Sản phẩm bán chạy (product_bestseller/giới hạn)
Route::get('product_bestseller/{limit}', [ProductController::class, 'product_bestseller']);
// UC7-1: Danh mục (category_list/cấp)
Route::get('category_list/{parentid?}', [CategoryController::class, 'category_list']);
// UC7-2: Sản phẩm theo danh mục (product_category/mã danh mục/giới hạn)
Route::get('/category/{id}/products', [CategoryController::class, 'getProductsByCategory']);


// UC8: Bài viết mới nhất (post_new/giới hạn)
Route::get('post_new/{limit}', [PostController::class, 'post_new']);
// UC9: Trang đơn (post_page/slug)
Route::get('post_page/{slug}', [PostController::class, 'post_page']);
// UC10: Sản phẩm (product_all/mã danh mục/giới hạn)
Route::get('product_all/{categoryid}/{limit}', [ProductController::class, 'product_all']);
// UC11: Chi tiết sản phẩm (product_detail/slug/giới hạn)
Route::get('product_detail/{slug}/{limit}', [ProductController::class, 'product_detail']);
// UC12: Bài viết (post_all/mã chủ đề/giới hạn)
Route::get('post_all/{topicid}/{limit}', [PostController::class, 'post_all']);
// UC13: Chi tiết bài viết (post_detail/slug/giới hạn)
Route::get('post_detail/{slug}/{limit}', [PostController::class, 'post_detail']);
// UC14: Liên hệ (contact/store)
Route::post('contact/store', [ContactController::class, 'store']);
// UC15: Đăng ký (customer/register)
Route::post('customer/register', [UserController::class, 'customer_register']);
// UC16: Đăng nhập (customer/login)
Route::get('customer/login', [UserController::class, 'customer_login']);
// UC17: Thông tin tài khoản (customer/profile/mã tài khoản)
Route::get('customer/profile/{id}', [UserController::class, 'customer_profile']);
// UC18: Lịch sử mua hàng (customer/cart/mã tài khoản)
Route::get('customer/cart/{id}', [UserController::class, 'customer_cart']);
// UC19: Thanh toán (customer/checkout/mã tài khoản)
Route::get('customer/checkout/{id}', [UserController::class, 'customer_checkout']);

// Route cho trang quản lý
// UC20: Đăng nhập và quên mật khẩu
Route::get('admin/login', [UserController::class, 'login']);
Route::get('admin/forget', [UserController::class, 'getforget']);
Route::post('admin/forget', [UserController::class, 'postforget']);
// UC 21: Cập nhật cấu hình
Route::get('config', [ConfigController::class, 'index']);
Route::post('config/update/{id}', [ConfigController::class, 'update']);
// UC 22: Quản lý banner
Route::prefix('banner')->group(function () {
    Route::get('/', [BannerController::class, 'index']);
    Route::get('trash', [BannerController::class, 'trash']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::post('store', [BannerController::class, 'store']);
    Route::put('update/{id}', [BannerController::class, 'update']);
    Route::get('status/{id}', [BannerController::class, 'status']);
    Route::get('delete/{id}', [BannerController::class, 'delete']);
    Route::get('restore/{id}', [BannerController::class, 'restore']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
});
// UC 23: Quản lý thương hiệu
Route::prefix('brand')->group(function () {
    Route::get('/', [BrandController::class, 'index']);
    Route::get('/trash', [BrandController::class, 'trash']);
    Route::get('/show/{id}', [BrandController::class, 'show']);
    Route::post('/store', [BrandController::class, 'store']);
    Route::post('/update/{id}', [BrandController::class, 'update']);
    Route::get('/status/{id}', [BrandController::class, 'status']);
    Route::get('/delete/{id}', [BrandController::class, 'delete']);
    Route::get('/restore/{id}', [BrandController::class, 'restore']);
    Route::delete('/destroy/{id}', [BrandController::class, 'destroy']);
});
// UC 24: Quản lý danh mục
Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/trash', [CategoryController::class, 'trash']);
    Route::get('/show/{id}', [CategoryController::class, 'show']);
    Route::post('/store', [CategoryController::class, 'store']);
    Route::post('/update/{id}', [CategoryController::class, 'update']);
    Route::get('/status/{id}', [CategoryController::class, 'status']);
    Route::get('/delete/{id}', [CategoryController::class, 'delete']);
    Route::get('/restore/{id}', [CategoryController::class, 'restore']);
    Route::delete('/destroy/{id}', [CategoryController::class, 'destroy']);
});
// UC 25: Quản lý menu

Route::prefix('menu')->group(function () {
    Route::get('/', [MenuController::class, 'index']);
    Route::get('/show/{id}', [MenuController::class, 'show']);
    Route::post('/store', [MenuController::class, 'store']);
    Route::post('/update/{id}', [MenuController::class, 'update']);
    Route::delete('/destroy/{id}', [MenuController::class, 'destroy']);
});

// UC 26: Quản lý liên hệ
Route::prefix('contact')->group(function () {
    Route::get('/', [ContactController::class, 'index']);
    Route::get('/trash', [ContactController::class, 'trash']);
    Route::get('/show/{id}', [ContactController::class, 'show']);
    Route::post('/reply/{id}', [ContactController::class, 'reply']);
    Route::get('/status/{id}', [ContactController::class, 'status']);
    Route::get('/delete/{id}', [ContactController::class, 'delete']);
    Route::get('/restore/{id}', [ContactController::class, 'restore']);
    Route::delete('/destroy/{id}', [ContactController::class, 'destroy']);
});
// UC 27: Quản lý bài viết
Route::prefix('post')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/trash', [PostController::class, 'trash']);
    Route::get('/show/{id}', [PostController::class, 'show']);
    Route::post('/store', [PostController::class, 'store']);
    Route::put('/update/{id}', [PostController::class, 'update']);
    Route::get('/status/{id}', [PostController::class, 'status']);
    Route::get('/delete/{id}', [PostController::class, 'delete']);
    Route::get('/restore/{id}', [PostController::class, 'restore']);
    Route::delete('/destroy/{id}', [PostController::class, 'destroy']);
});
// UC 28: Quản lý chủ đề bài viết
Route::prefix('topic')->group(function () {
    Route::get('/', [TopicController::class, 'index']);
    Route::get('/trash', [TopicController::class, 'trash']);
    Route::get('/show/{id}', [TopicController::class, 'show']);
    Route::post('/store', [TopicController::class, 'store']);
    Route::put('/update/{id}', [TopicController::class, 'update']);
    Route::get('/status/{id}', [TopicController::class, 'status']);
    Route::get('/delete/{id}', [TopicController::class, 'delete']);
    Route::get('/restore/{id}', [TopicController::class, 'restore']);
    Route::delete('/destroy/{id}', [TopicController::class, 'destroy']);
});
// UC 29: Quản lý thành viên
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/trash', [UserController::class, 'trash']);
    Route::get('/show/{id}', [UserController::class, 'show']);
    Route::post('/store', [UserController::class, 'store']);
    Route::post('/update/{id}', [UserController::class, 'update']);
    Route::get('/status/{id}', [UserController::class, 'status']);
    Route::get('/delete/{id}', [UserController::class, 'delete']);
    Route::get('/restore/{id}', [UserController::class, 'restore']);
    Route::delete('/destroy/{id}', [UserController::class, 'destroy']);
});
// UC 30: Quản lý đơn hàng
Route::prefix('order')->group(function () {
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/trash', [OrderController::class, 'trash']);
    Route::get('/show/{id}', [OrderController::class, 'show']);
    Route::get('/status/{id}', [OrderController::class, 'status']);
    Route::get('/delete/{id}', [OrderController::class, 'delete']);
    Route::get('/restore/{id}', [OrderController::class, 'restore']);
    Route::delete('/destroy/{id}', [OrderController::class, 'destroy']);
});
// UC 31: Quản lý sản phẩm
Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/trash', [ProductController::class, 'trash']);
    Route::get('/show/{id}', [ProductController::class, 'show']);
    Route::post('/store', [ProductController::class, 'store']);
    Route::put('/update/{id}', [ProductController::class, 'update']);
    Route::get('/delete/{id}', [ProductController::class, 'delete']);
    Route::get('/restore/{id}', [ProductController::class, 'restore']);
    Route::delete('/destroy/{id}', [ProductController::class, 'destroy']);
    Route::get('/bestseller/{limit}', [ProductController::class, 'product_bestseller']);
});
// UC 32: Quản lý sản phẩm khuyến mãi
Route::prefix('product_sale')->group(function () {
    Route::get('/', [ProductSaleController::class, 'index']);
    Route::get('/trash', [ProductSaleController::class, 'trash']);
    Route::get('/show/{id}', [ProductSaleController::class, 'show']);
    Route::post('/store', [ProductSaleController::class, 'store']);
    Route::put('/update/{id}', [ProductSaleController::class, 'update']);
    Route::get('/status/{id}', [ProductSaleController::class, 'status']);
    Route::get('/delete/{id}', [ProductSaleController::class, 'delete']);
    Route::get('/restore/{id}', [ProductSaleController::class, 'restore']);
    Route::delete('/destroy/{id}', [ProductSaleController::class, 'destroy']);
});
// UC 33: Quản lý nhập kho
Route::prefix('product_store')->group(function () {
    Route::get('/', [ProductStoreController::class, 'index']);
    Route::get('/trash', [ProductStoreController::class, 'trash']);
    Route::get('/show/{id}', [ProductStoreController::class, 'show']);
    Route::post('/store', [ProductStoreController::class, 'store']);
    Route::put('/update/{id}', [ProductStoreController::class, 'update']);
    Route::get('/status/{id}', [ProductStoreController::class, 'status']);
    Route::get('/delete/{id}', [ProductStoreController::class, 'delete']);
    Route::get('/restore/{id}', [ProductStoreController::class, 'restore']);
    Route::delete('/destroy/{id}', [ProductStoreController::class, 'destroy']);
});

