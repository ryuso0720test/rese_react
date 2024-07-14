import { useNavigate } from "react-router-dom";
import React from 'react';

const Home = () => {
    const navigate = useNavigate()
    const handleForm = () => {
        navigate('/Form')
    }
    const handleView = () => {
        navigate('/View')
    }
    return (
        <>
            <button onClick={handleForm}>投稿画面へ</button>
            <br />
            <button onClick={handleView}>表示画面へ</button>
        </>
    )
}
export default Home;