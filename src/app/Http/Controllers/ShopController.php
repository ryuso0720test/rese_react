<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Like;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class ShopController extends Controller
{
    function index()
    {
        $shops = Shop::all([
            'id',
            'name',
            'area_id',
            'category_id',
            'image',
        ]);
        $userId = Auth::id();

        Log::debug($userId);

        // Log::debug($shops);

        foreach ($shops as $shop) {
            // Log::debug($shop);
            $like = NULL;
            $like = Like::query()
                ->where('user_id', $userId)
                ->where('shop_id', $shop['id'])
                ->value('shop_id');
            if ($like != NULL) {
                Log::debug('値あり');
                $shop['like'] = $like;
            } else {
                Log::debug('値なし');
                $shop['like'] = NULL;
            }
        }
        Log::debug($shops);


        // $likeShop = DB::table('likes')
        //     ->join('shops', 'likes.shop_id', '=', 'shops.id')
        //     ->where('user_id', $userId)
        //     ->get(['shop_id']);

        return response()->json([
            'data' => $shops,
        ],);
    }

    function detail()
    {
        $shops = Shop::all();
    }
}
