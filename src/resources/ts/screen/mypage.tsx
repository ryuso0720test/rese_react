import React from 'react';
import Header from "../components/Header";
import styles from "../../css/mypage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { IoMdTimer } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from 'axios';
import { WtReserve } from "../type/reserve";
import { WtShop } from "../type/shop";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

const Mypage = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    const location = useLocation();
    const [userId, setUserId] = useState<number>(location.state.user_id as number)
    const [user, setUser] = useState();
    const [reserves, setReserve] = useState<WtReserve>([]);
    const [shops, setShops] = useState<WtShop>([]);

    // 取得API
    const getReserve = async () => {
        const response = await fetch('/api/reserve');
        const json = await response.json();
        setReserve(json.data)
    }
    const getShops = async () => {
        const response = await fetch('/api/myPage/like');
        const json = await response.json();
        setShops(json.data);
    }
    const getUserName = async () => {
        console.log("user_id"+ userId);
        const response = await fetch(`/api/user/name/${userId}`);
        const json = await response.json();
        setUser(json.data);
         console.log(json.data);
    }

    const deleteReserve = async (id: number) => {
        axios.delete("/api/reserve/delete/" + id).then(() => {
            console.log('予約削除成功');
            getReserve();
        }).catch(function (error) {
            console.log('予約削除失敗');
        });
        
    }

    useEffect(() => {
        getReserve();
        getShops();
        getUserName();
    }, []);

    const handleClick = (shop_id: number) => {
    };

    const handleDelete = (id: number) => {
        deleteReserve(id);
    };


    return (
        <div className={styles.mypage}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h3>予約状況</h3>
                    <ul className={styles.res_list}>
                        {
                            reserves.map((reserve: WtReserve) => (
                                <li className={styles.res}  key={reserve.id }>
                                    <div className={styles.res_top}>
                                        <div className={styles.res_top_left}>
                                            <IoMdTimer size="1.8em" />
                                        </div>
                                        <div className={styles.res_top_center}>
                                            予約{reserve.index}
                                        </div>
                                        <div className={styles.res_top_right}>
                                             <button className={styles.deleteBtn}
                                                onClick={() => handleDelete(reserve.id)}>
                                                <MdOutlineCancel size="1.8em"/>
                                            </button>
                                        </div>
                                    </div>
                                    <table className={styles.res_table}>
                                        <tr>
                                            <th>Shop</th>
                                            <th>{reserve.shop_name }</th>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <th>{reserve.date }</th>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <th>{reserve.time}</th>
                                        </tr>
                                        <tr>
                                            <th>Number</th>
                                            <th>{reserve.people}人</th>
                                        </tr>
                                    </table>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.right}>
                    <h2>{ user}さん</h2>
                    <h3>お気に入り店舗</h3>
                    <ul className={styles.fav_list}>
                        {
                            shops.map((shop: WtShop) => (
                                <li className={styles.shop_item } key={shop.id }>
                                    <div className="item">
                                        <div className={styles.image}>
                                            <img src={"image/" + shop.image} className="App-logo" alt="logo" />
                                        </div>
                                        <div className="under">
                                            <h3 className="shopName">
                                                {shop.name}
                                            </h3>
                                            <div className="tag">
                                                <div className="area">
                                                    <p>#{ shop.area_name}</p>
                                                </div>
                                                <div className="category">
                                                        <p>#{ shop.category_name}</p>
                                                </div>
                                            </div>
                                            <div className="item-status">
                                                <form action={"/detail/" + shop.id} method="get">
                                                    <button onClick={() => handleDetail(
                                                        shop.id,
                                                        shop.name,
                                                        shop.category_name,
                                                        shop.area_name,
                                                        shop.overview,
                                                        shop.image,
                                                    )} className="detail" >詳しくみる</button>
                                                </form>
                                                <button className="likeBtn"
                                                    onClick={() => handleClick(shop.id)}>
                                                    <MdFavorite  size="1.8em" color="#ff0000" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Mypage;