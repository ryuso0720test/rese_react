import { Routes, Route } from "react-router-dom";
import View from "./View"
import Detail from "./screen/detail"
import Result from "./screen/result"
import Mypage from "./screen/mypage"
import Thanks from "./screen/thanks"
import Login from "./screen/login"
import Register from "./screen/registeration"
import Item from "./screen/Items"



export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Item />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/view" element={<View />} />
            <Route path="/done" element={<Result />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
        </Routes>
    )
}