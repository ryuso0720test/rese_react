<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ReserveController;
use Illuminate\Support\Facades\Log;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    Log::debug($user);
    return response()->json([
        'data' => $user->id
    ],);
});
Route::middleware('auth')->group(function () {
    Route::get('/', [AuthController::class, 'index']);
});
Route::get('/user/name/{id}', [UsersController::class, 'getAuthUserName']);


Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shops/{area_id}/{category_id}/{word}', [ShopController::class, 'search']);
Route::get('/shop/{id}', [ShopController::class, 'detail']);
Route::get('/myPage/like', [ShopController::class, 'userFavorite']);

Route::get('/areas', [AreaController::class, 'getAreaAll']);

Route::get('/categories', [CategoryController::class, 'getCategoryAll']);

Route::post('/likeUp', [LikeController::class, 'updateLike']);
Route::delete('/like/delete/{user_id}/{shop_id}', [LikeController::class, 'deleteLike']);

Route::post('/postReserve', [ReserveController::class, 'postReserve']);
Route::get('/reserve', [ReserveController::class, 'getReserve']);
Route::delete('/reserve/delete/{id}', [ReserveController::class, 'deleteReserve']);
