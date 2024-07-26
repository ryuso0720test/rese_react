<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShopController;


Route::middleware('auth')->group(function () {
    Route::get('/', [AuthController::class, 'index']);
});
Route::get('/', [AuthController::class, 'index']);
Route::get('/login', [AuthController::class, 'index']);
Route::get('/register', [AuthController::class, 'index']);

// Route::get('/detail/{id}', [ShopController::class, 'detail']);

// Route::post('/register', [UsersController::class, 'store']);
// Route::post('/logout', [UsersController::class, 'delete']);