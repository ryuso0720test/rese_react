<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ReserveController;
use Illuminate\Support\Facades\Log;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    Log::debug($user);
    return response()->json([
        'data' => $user->id
    ],);
    // return $request->user();
});
Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shop/{id}', [ShopController::class, 'detail']);

Route::get('/areas', [AreaController::class, 'getAreaAll']);
Route::get('/area/{id}', [AreaController::class, 'getArea']);
Route::get('/categories', [CategoryController::class, 'getCategoryAll']);

Route::post('/likeUp', [LikeController::class, 'updateLike']);

Route::post('/postReserve', [ReserveController::class, 'postReserve']);
