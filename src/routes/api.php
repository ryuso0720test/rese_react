<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\CategoryController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::group(['middleware' => 'api'], function () {
//     Route::get('shops', 'ShopController@index');
// });
Route::get('/shops', [ShopController::class, 'index']);

Route::get('/areas', [AreaController::class, 'getAreaAll']);
Route::get('/categories', [CategoryController::class, 'getCategoryAll']);
