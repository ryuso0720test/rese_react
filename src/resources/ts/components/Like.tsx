import React, { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md";

type Param = {
    flg: boolean;
}
function Like({ shop_id, likeArray,user_id }) {
    const likes = likeArray;
    const shopId = shop_id;
    const userId = user_id;
    const [likeFlg, setLikeFlg] = useState();

    const rt = likes.map((like: any) => {
        if (like.user_id == userId && like.shop_id == shopId) {
            return (true);
        } else {
            return (false);
        }
    })
    console.log(rt);
    // likes.forEach((like: any) => {
    //     if (like.user_id == userId && like.shop_id == shopId) {
    //         setLikeFlg();
    //         return;
    //     }
    // });
    return (
        <>
            {
                // areaArray.map((area) => {
                //     if (id == area.id as number) {
                //         return (
                //             <p key={area.id}>#{area.name}</p>
                //         )
                //     }
                // })
            }
        </>
    );
}
export default Like;