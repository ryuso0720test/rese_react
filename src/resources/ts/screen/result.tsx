import React from 'react';
import Header from "../components//Header";
import styles from "../../css/result.module.css";
import { useNavigate } from "react-router-dom";

const Result = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className={styles.result}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <h3 className={styles.result_m}>ご予約ありがとうございます</h3>
                <button onClick={handleBack} className={styles.result_back}>戻る</button>
            </div>
        </div>
    )
}
export default Result;