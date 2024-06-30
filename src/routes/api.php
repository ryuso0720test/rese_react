<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UsersController;
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

Route::get('/areas', [AreaController::class, 'getAreaAll']);
Route::get('/categories', [CategoryController::class, 'getCategoryAll']);

Route::get('/likes', [AreaController::class, 'updateLike']);