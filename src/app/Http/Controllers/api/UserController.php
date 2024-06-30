<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function getAuthUser()
    {

        $user = Auth::user();
        
        Log::debug($user);
       
        // return response()->json([
        //     'data' => "a"
        // ],);
    }
}
