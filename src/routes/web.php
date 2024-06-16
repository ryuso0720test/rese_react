<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\loginController;


Route::middleware('auth')->group(function () {
    Route::get('/', [AuthController::class, 'index']);
});

Route::post('/register', [UsersController::class, 'store']);
Route::get('/logout', [loginController::class, 'destroy']);
