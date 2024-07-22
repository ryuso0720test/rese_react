<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserve;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReserveController extends Controller
{
    function postReserve(Request $request)
    {
        $res = $request->only([
            'user_id',
            'shop_id',
            'date',
            'time',
            'people'
        ]);

        Reserve::create($res);
    }

    function getReserve()
    {
        $userId = Auth::id();

        $res = DB::table('reserves')
            ->join('shops', 'reserves.shop_id', '=', 'shops.id')
            ->select(
                'reserves.id',
                'shops.name as shop_name',
                'reserves.people',
            )
            ->selectRaw('DATE_FORMAT(date, "%Y-%m-%d") AS date')
            ->selectRaw('DATE_FORMAT(time, "%h:%i") AS time')
            ->get();

        $resArray =
            json_decode(json_encode($res), true);

        $resData = [];
        $i = 1;
        foreach ($resArray as $resItem) {
            $resItem['index'] = $i++;
            array_push($resData, $resItem);
            // Log::debug($resItem);
        };

        // Log::debug($resData);

        return response()->json([
            'data' => $resData,
        ],);
    }

    function deleteReserve($id)
    {
        Log::debug($id);
        $reserve = Reserve::find($id);
        $reserve->delete();
    }
}
