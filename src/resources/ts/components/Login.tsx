
import React, { useState,useRef } from "react"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import Header from "../components//Header";
import "../../../public/css/login.css";
import axios from 'axios';

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: any) => {;
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const metaCsrfToken = document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement;

    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div>
            <div className='formContainer'>
                <form className="form" action="/login" method="post">
                    <input type="hidden" name="_token" value={ csrfToken.current } />
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
                        />
                    </div>
                    <button className="submitButton">ログイン</button>
                    </div>
                </form>
            </div>
        </div>
    
    )
}

export default Login;