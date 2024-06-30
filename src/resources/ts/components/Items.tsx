
import React, { useEffect, useState, useRef } from "react";
import "../../../public/css/index.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Area from './Area';

type AreaList = {
  id: number
  name: string
}

const Item = () => {

    const [shops, setShops] = useState([]);
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [likes, setLike] = useState([]);
    const [userId, setUserId] = useState();

    

    // shops取得API
    const getShops = async () => {
        const response = await fetch('/api/shops');
        const json = await response.json();
        setShops(json.data);
    }
    // areas取得API
    const getAreas = async () => {
        const response = await fetch('http://localhost/api/areas');
        const json = await response.json();
        // console.log(json.data);
        setAreas(json.data);
    }
    // category取得API
    const getCategories = async () => {
        const response = await fetch('http://localhost/api/categories');
        const json = await response.json();
        setCategories(json.data);
    }

    const getLike = async () => {
        const response = await fetch('http://localhost/api/likes');
        const json = await response.json();
        setCategories(json.data);
    }

    const fetchAuthUser = async () => {
        // const response = await fetch('http://localhost/api/userId');
        // console.log('通信成功');
        axios.get('/api/user').then(response => {
            console.log('通信成功');
            console.log(response.data);
            setUserId(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    const handleClick = () => {
        getLike();
    };


    useEffect(() => {
        getShops();
        getCategories();
        getAreas();
        fetchAuthUser();
    }, []);
    

    return (
        <ul>
            {shops.map((shop: any) => (
                <li key={shop.id }>
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
                                    <Area area_id={shop.area_id}
                                        areaArray={areas} />
                                </div>
                                <div className="category">
                                    {categories.map((category: any) => {
                                        if (category.id == shop.category_id) {
                                            return (
                                                <p key={category.id}>#{category.name}</p>
                                            )
                                        }
                                     })}
                                </div>
                            </div>
                            <div className="item-status">
                                <form action="/detail/" method="get">
                                    <button className="detail" >詳しくみる</button>
                                </form>
                                <MdFavoriteBorder onClick={handleClick} size="1.8em" />
                             </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Item;