
import React, { useRef,useState } from "react"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../../public/css/register.css";
import axios from 'axios';
import Header from "../components//Header";
import { useCookies } from 'react-cookie';

const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

function Register() {
    const initialValues = { name: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const register = async () => {
        const requestBody = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        };
        http.post("/fortify/register", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            console.log('会員登録成功');
            removeCookie('accesstoken', { path: '/thanks' }, { httpOnly: true });
            removeCookie('refreshtoken', { path: '/thanks' }, { httpOnly: true });
            console.log(cookies);
            navigate('/thanks')
        }).catch(function (error) {
            console.log('会員登録失敗');
            setIsSubmit(false)
        })
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        register();
        console.log(Object.keys(formErrors).length);
    };
    const validate = (values) => {
        const errors = {};
        const regex = /^[a-zA-Z0-9.?/-]{8,19}$/;
        if (!values.name) {
            errors.name = "ユーザー名を入力してください";
        }
        if (!values.email) {
            errors.email = "メールアドレスを入力してください";
        }
        if (!values.password) {
            errors.password = "パスワードを入力してください";
        } else if (!regex.test(values.password)) {
            errors.password = "8文字以上もしくは正しいフォーマットで入力してください";
        }
        if (!isSubmit) {
            errors.public = "入力情報が正しくありません,もしくはメールアドレスが登録済みです"
        }
        return errors;
    };

    return (
        <div className="index">
        <div className="main-header">
            <Header />
        </div>
        <div className='formContainer'>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <h1>Register</h1>
            <div className="uiForm">
                <p className="errorMsg">{ formErrors.public}</p>
                <div className="formField">
                    <label><FaUser  className="icon" size="1.5rem"/></label>
                    <input
                        type="text"
                        placeholder='username'
                        name='name'
                        value={formValues.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <p className="errorMsg">{ formErrors.name}</p>
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
                    />
                </div>
                <p className="errorMsg">{ formErrors.password}</p>
                        <button className="submitButton">登録</button>
                        {Object.keys(formErrors).length === 0 && isSubmit}
            </div>
            </form>
        </div>
    </div>
    )
}

export default Register;