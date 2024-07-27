import React from 'react';
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker'
import "react-datepicker/dist/react-datepicker.css"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Header from "../components/Header";
import "../../../public/css/detail.css";
import { CiCalendar } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { time } from "../pullDownStore/time";
import { people } from "../pullDownStore/people";
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

const WrapDatePicker: any = DatePicker;

export type ShopUser = {
    id: number;
    user_id: number;
    name: string;
    category_name: string;
    area_name: string;
    overview: string;
    image: string;
};
const Detail = () => {

    const location = useLocation();
    const [selectId, setSelectId] = useState<ShopUser>(location.state as ShopUser)
    const [startDate, setStartDate] = useState(new Date());
    const [selectedPeople, setSelectedPeople] = useState<number>(1);
    const [selectedTime, setSelectedTime] = useState(time[0]);
    const [selectedDate, setSelectedDate] = useState();
    const Today = new Date();

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

    const handleDone = () => {
        navigate('/done');
    }

    const postReserve = async () => {
        const dateFormat = startDate.toLocaleDateString('sv-SE')
        const requestBody = {
            user_id: selectId.user_id,
            shop_id: selectId.id,
            date: dateFormat,
            time: selectedTime,
            people: selectedPeople,
        };
        http.post("/api/postReserve", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            handleDone();
        }).catch(function (error) {
            console.log('予約失敗');
            navigate('/login');
        })
    }

    useEffect(() => {
        // getShop();
    }, []);

    const timeChange = (e: any) => {
        setSelectedTime(e.target.value);
    };
    const peopleChange = (e: any) => {
        setSelectedPeople(Number(e.target.value));
    };
    const dateChange = (date: Date) => {
        const dateFormat = date.toLocaleDateString('sv-SE')
        const setDate = new Date(dateFormat);

        setStartDate(setDate);
        console.log(setDate);
    };
    const handleClick = () => {
        postReserve();
    };


    return (
        <div className='detail-main'>
            <div className="left">
                <div className="header">
                    <Header />
                </div>
                <div className="info">
                    <div className="back">
                        <button className='backBtn' onClick={handleBack}>
                            ＜
                        </button>
                    </div>
                    <h2 className="shop_name">{selectId['name'] }</h2>
                </div>
                <div className="info-image">
                    <img className='img-logo' src={"../image/" + selectId['image']} alt="image" />
                </div>
                <div className="detail_tag">
                    <div className="detail_area">
                        <p>#{ selectId['area_name']}</p>
                    </div>
                    <div className="detail_category">
                        <p>#{ selectId['category_name']}</p>
                    </div>
                </div>
                <div className="detail_text">
                    <p>{selectId['overview'] }</p>
                </div>
            </div>
            <div className="right">
                <div className="reserve">
                    <h2 className='reserve_title'>予約</h2>
                    <div className='reserve__date'>
                        <WrapDatePicker className='reserve__date-input'
                            selected={startDate}
                            dateFormat="yyyy/MM/dd"
                            onChange={(date: any) => dateChange(date)}
                            minDate={Today}
                        />
                        <CiCalendar className='reserve__date-icon'  onClick={() => DatePicker}/>
                    </div>
                    <div className="reserve__time">
                        <select className='time-sel' onChange={timeChange}>
                            {time.map((t) => {
                            return <option key={t}>{t}</option>;
                            })}
                            <FaCaretDown />
                        </select>
                    </div>
                    <div className="reserve__people">
                        <select className='people-sel' onChange={peopleChange}>
                            {people.map((p) => {
                            return <option key={p} value={p}>{p}人</option>;
                            })}
                            <p>人</p>
                        </select>
                    </div>
                    <div className="preview">
                        <table className='preview_table'>
                            <tr>
                                <th>Shop</th>
                                <th>{selectId['name'] }</th>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <th>{startDate.toLocaleDateString('sv-SE')}</th>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <th>{selectedTime }</th>
                            </tr>
                            <tr>
                                <th>Number</th>
                                <th>{selectedPeople }</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <button onClick={() => handleClick()} className="res_btn">予約する</button>
            </div>
        </div>
    )
} 
export default Detail;