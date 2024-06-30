<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UsersController extends Controller
{
    function getAuthUser()
    {
        $id = Auth::id();

        Log::debug($id);

        return response()->json([
            'data' => $id
        ],);
    }
}
