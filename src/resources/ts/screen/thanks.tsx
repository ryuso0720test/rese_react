
import Header from "../components/Header";
import styles from "../../css/result.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

const Thanks = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/login');
    }

    const logout = async () => {
        http.post("/api/logout", {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
          console.log('強制ログアウト成功');
        }).catch(function (error) {
          console.log('強制ログアウト失敗');
        })
    }
    useEffect(() => {
        logout();
    }, []);

    return (
        <div className={styles.result}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <h3 className={styles.result_m}>会員登録ありがとうございます</h3>
                <button onClick={handleBack} className={styles.result_back}>ログインする</button>
            </div>
        </div>
    )
}
export default Thanks;