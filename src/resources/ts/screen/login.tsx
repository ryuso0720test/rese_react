
import React, { useState,useRef } from "react"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import Header from "../components//Header";
import "../../../public/css/login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

const Login = () => {
    const navigate = useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
    
    const login = async () => {
        const requestBody = {
            email: formValues.email,
            password: formValues.password,
        };
        http.post("/login", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            console.log('ログイン成功');
            navigate('/')
        }).catch(function (error) {
            console.log('ログイン失敗');
        })
    }
    const loginClick = ( e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,) => {
        login();
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') return
        loginClick(e)
    }

  const metaCsrfToken = document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement;

    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div className="index">
            <div className="main-header">
                    <Header />
            </div>
            <div className='formContainer'>
                <div className="form" >
                    <h1>Login</h1>
                    <div className="uiForm">
                        <div className="formField">
                            <label><MdEmail className="icon" size="1.5rem"/></label>
                            <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={formValues.email}
                            onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="formField">
                            <label><IoMdLock className="icon" size="1.5rem"/></label>
                            <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={formValues.password}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button type="submit" onClick={() => loginClick(e)}  className="submitButton">ログイン</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;