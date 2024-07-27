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

    function getAuthUserName($id)
    {
        Log::debug($id);
        $name = User::query()
            ->where('id', $id)
            ->value("name");

        Log::debug($name);

        return response()->json([
            'data' => $name
        ],);
    }

    public function index()
    {
        return view('index');
    }
}
