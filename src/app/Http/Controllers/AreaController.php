<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Support\Facades\Log;

class AreaController extends Controller
{
    function getAreaAll()
    {
        $areas = Area::all();

        return response()->json([
            'data' => $areas
        ],);
    }
}
