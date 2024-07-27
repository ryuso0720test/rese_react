<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    function getCategoryAll()
    {
        $areas = Category::all(['id', 'name']);

        return response()->json([
            'data' => $areas
        ],);
    }
}
