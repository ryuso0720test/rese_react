
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

const http = axios.create({
    baseURL: 'http://localhost/',
    withCredentials: true,
});

const Item = () => {

    const [shops, setShops] = useState([]);
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areaList, setAreaList] = useState<AreaList | null>(null)

    // shops取得API
    const getShops = async () => {
        const response = await fetch('http://localhost/api/shops');
        const json = await response.json();
        setShops(json.data);
    }
    // areas取得API
    const getAreas = async () => {
        const response = await fetch('http://localhost/api/areas');
        const json = await response.json();
        // console.log(json.data);
        setAreas(json.data);
        setAreaList(json.data);
    }
    // category取得API
    const getCategories = async () => {
        const response = await fetch('http://localhost/api/categories');
        const json = await response.json();
        setCategories(json.data);
    }

    useEffect(() => {
        getShops();
        getCategories();
        getAreas();
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
                                <MdFavoriteBorder size="1.8em" />
                             </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Item;