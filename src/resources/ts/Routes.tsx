import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Home from "./Home"
import Form from "./screen/Form"
import View from "./View"
import Detail from "./screen/detail"
import Result from "./screen/result"
import Mypage from "./screen/mypage"
import Login from "./screen/login"
import Item from "./components/Items"
import axios from 'axios';

const fetchAuthUser = async () => {
    axios.get('/api/user').then(response => {
        console.log('通信成功');
    })
    .catch(() => {
        console.log('通信に失敗しました');
    });
}



export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Item />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/view" element={<View />} />
            <Route path="/done" element={<Result />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}