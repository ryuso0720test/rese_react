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

use function PHPUnit\Framework\isEmpty;

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

    function userFavorite()
    {
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
                array_push($shopsData, $shop);
            }
        };

        return response()->json([
            'data' => $shopsData,
        ],);
    }

    function search($area_id, $category_id, $word)
    {
        // $bl = $word.isEmpty();
        Log::debug($area_id);
        Log::debug($category_id);
        Log::debug($word);
        //地域のみ
        if($area_id !=0 && $category_id == 0 && $word == 0) {
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
            ->where('shops.area_id', $area_id)
            ->get();
        }
        // ジャンルのみ
        if ($area_id == 0 && $category_id != 0 && $word == 0) {
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
                ->where('shops.category_id', $category_id)
                ->get();
        }

        // キーワードのみ
        if ($area_id == 0 && $category_id == 0 && $word != 0
        ) {
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
                ->where('shops.name', 'LIKE', '%' . $word . '%')
                ->get();
        }

        // ジャンルと地域
        if ($area_id != 0 && $category_id != 0 && $word == 0
        ) {
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
                ->where('shops.category_id', $category_id)
                ->where('shops.area_id', $area_id)
                ->get();
        }

        // 地域とキーワード
        if (
            $area_id != 0 && $category_id == 0 && $word != 0
        ) {
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
                ->where('shops.name', 'LIKE', '%' . $word . '%')
                ->where('shops.area_id', $area_id)
                ->get();
        }
        // ジャンルとキーワード
        if (
            $area_id == 0 && $category_id != 0 && $word != 0
        ) {
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
                ->where('shops.name', 'LIKE', '%' . $word . '%')
                ->where('shops.category_id', $category_id)
                ->get();
        }

        // 全一致
        if (
            $area_id != 0 && $category_id != 0 && $word != 0
        ) {
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
                ->where('shops.name', 'LIKE', '%' . $word . '%')
                ->where('shops.area_id', $area_id)
                ->where('shops.category_id', $category_id)
                ->get();
        }

        //リセット
        if (
            $area_id == 0 && $category_id == 0 && $word == 0
        ) {
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
        }
        
        $userId = Auth::id();

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
}
