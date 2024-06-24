<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;

class ShopController extends Controller
{
    function index()
    {
        $shops = Shop::all();

        return response()->json([
            'data' => $shops
        ],);
    }

    function detail()
    {
        $shops = Shop::all();
    }
}
