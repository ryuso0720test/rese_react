<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserve;
use Illuminate\Support\Facades\Log;

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
}
