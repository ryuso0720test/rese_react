<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Area;
use App\Models\Like;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    function index()
    {
        // Log::debug($shops);
        $shops = DB::table('shops')
            ->join('areas', 'shops.area_id', '=', 'areas.id')
            ->join('categories', 'shops.category_id', '=', 'categories.id')
            ->select(
                'shops.id',
                'shops.name',
                'areas.name as area_name',
                'categories.name as category_name',
                'shops.overview',
                'shops.image'
            )
            ->get();
        $userId = Auth::id();

        // $a = DB::table('shops')->with('areas')->get();

        // Log::debug($a);
        $shopsData = [];
        $shopsArray =
            json_decode(json_encode($shops), true);

        foreach ($shopsArray as $shop) {
            $like = NULL;
            $like = Like::query()
                ->where('user_id', $userId)
                ->where('shop_id', $shop['id'])
                ->value('shop_id');
            if ($like != NULL) {
                $shop['like'] = $like;
            } else {
                $shop['like'] = 0;
            }
            array_push($shopsData, $shop);
        };

        return response()->json([
            'data' => $shopsData,
        ],);
    }

    function detail($id)
    {
    }
}
