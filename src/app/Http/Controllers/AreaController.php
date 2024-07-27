<?php

namespace App\Http\Controllers;

use App\Models\Area;

class AreaController extends Controller
{
    function getAreaAll()
    {
        $areas = Area::all(['id','name']);

        return response()->json([
            'data' => $areas
        ],);
    }

    function getArea($id)
    {
        $areaName = Area::query()
            ->where('id', $id)
            ->get('name');

        return response()->json([
            'data' => $areaName
        ],);
    }
}
