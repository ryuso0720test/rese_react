
import React, { useState,useRef } from "react"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import Header from "../components//Header";
import "../../../public/css/login.css";
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(true)

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
        http.post("/fortify/login", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            navigate('/')
        }).catch(function (error) {
            console.log('ログイン失敗');
            setIsSubmit(false)
        })
    }
    const loginClick = ( e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,) => {
        login();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //ログイン情報送信
        //バリデーションチェック
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length === 0) {
            setIsSubmit(true);
            login();
        }
    };
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "メールアドレスを入力してください";
        }
        if (!values.password) {
            errors.password = "パスワードを入力してください";
        }
        if (!isSubmit) {
            errors.public = "入力情報が正しくありません"
        }
        return errors;
    }


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
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <h1>Login</h1>
                    <div className="uiForm">
                        <p className="errorMsg">{ formErrors.public}</p>
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
                        <p className="errorMsg">{ formErrors.email}</p>
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
                        <p className="errorMsg">{ formErrors.password}</p>
                        <button
                            type="submit" className="submitButton"
                        >ログイン</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;