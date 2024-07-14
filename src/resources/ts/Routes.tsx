import { Routes, Route } from "react-router-dom";
import Home from "./Home"
import Form from "./screen/Form"
import View from "./View"
import Detail from "./screen/detail"
import Result from "./screen/result"
import Item from "./components/Items"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Item />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/view" element={<View />} />
            <Route path="/done" element={<Result />} />
        </Routes>
    )
}