<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\isNull;

class LikeController extends Controller
{
    function updateLike(Request $request)
    {
        $like = $request->only([
            'user_id',
            'shop_id',
        ]);

        $userId = $request->only([
            'user_id',
        ]);
        $shopId = $request->only([
            'shop_id',
        ]);

        $likeId = Like::query()
            ->where('user_id', $userId)
            ->where('shop_id', $shopId)
            ->value('id');

        if ($likeId == null) {
            Like::create($like);
        } else {
            Like::where('id', $likeId)->delete();
        }

        // $work_id = Like::query()
    }
}
