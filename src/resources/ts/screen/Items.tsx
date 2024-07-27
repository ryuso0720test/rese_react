
import React, { useEffect, useState, useRef } from "react";
import "../../../public/css/index.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import Search from "../components/Search";
import { WtShop } from "../type/shop";

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

const Item = () => {
    const navigate = useNavigate();
    const handleDetail = (
        shop_id: number,
        name: string,
        category_name: string,
        area_name: string,
        overview: string,
        image: string,
    ) => {
        navigate(`/Detail/${shop_id}`, {
            state: {
                id: shop_id,
                user_id: userId,
                name: name,
                category_name: category_name,
                area_name: area_name,
                overview: overview,
                image: image,
            }
        })
    }

    const [shops, setShops] = useState<WtShop>([]);
    const [userId, setUserId] = useState();
    const initialSearch = { area_id: 0 , category_id: 0 ,word: 0 };
    const [searchObj, setSearchObj] = useState(initialSearch);


    const updateLike = async (shopId: number) => {
        const requestBody = {
            user_id: userId,
            shop_id: shopId,
        };
        http.post("/api/likeUp", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            console.log('お気に入り更新成功');

            if (
                searchObj.area_id == 0 &&
                searchObj.category_id == 0 &&
                searchObj.word == 0
            ) {
                getShops();
            } else {
                getShopSearch(
                    searchObj
                );
            }
            console.log(searchObj)
        }).catch(function (error) {
            console.log('お気に入り更新失敗');
        })
    }

    // shops取得API
    const getShops = async () => {
        const response = await fetch('/api/shops/');
        const json = await response.json();
        console.log(json.data);
        setShops(json.data);
    }
    
    const [formValues, setFormValues] = useState(0);
    const handleValueChange = (
        search: any
    ) => {
        setSearchObj(search)
        console.log(searchObj)
        getShopSearch(
            search,
        );
    };

    const getShopSearch = async (search: any) => {
        console.log(search.inputWord);
        if (search.inputWord == null ||
            search.inputWord == undefined ||
            search.inputWord == ""
        ) {
             const response =
                await fetch(`/api/shops/${search.area_id}/${search.category_id}/${formValues}/`);
            const json = await response.json();
            setShops(json.data);
            console.log(json.data);
        } else {
            const response =
                await fetch(`/api/shops/${search.area_id}/${search.category_id}/${search.inputWord}/`);
                const json = await response.json();
                setShops(json.data);
        }
    }

    const fetchAuthUser = async () => {
        axios.get('/api/user').then(response => {
            console.log('通信成功');
            console.log(response.data.data);
            setUserId(response.data.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    const handleClick = (shop_id: number) => {
        updateLike(shop_id);
    };


    useEffect(() => {
        fetchAuthUser();
        getShops();
    }, []);
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <div className="index">
            <div className="main-header">
                <Header />
                <Search handleValueChange={handleValueChange} />
            </div>
            <ul className="shop-list">
                {shops.map
                    ((shop: WtShop) => (
                    <li className="shop-item" key={shop.id }>
                        <div className="item">
                            <div className="image">
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
                                    { 
                                        (() => {
                                            if (shop.like == shop.id ) {
                                                return (
                                                    <button className="likeBtn"
                                                    onClick={() => handleClick(shop.id)}
                                                    >
                                                        <MdFavorite color="#ff0000"  size="1.8em" />
                                                    </button>

                                                );
                                            } else {
                                                return (
                                                <button className="likeBtn"
                                                    onClick={() => handleClick(shop.id)}>
                                                    <MdFavoriteBorder size="1.8em" />
                                                </button>
                                                )

                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Item;