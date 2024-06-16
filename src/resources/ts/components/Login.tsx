
import React from 'react'
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import "../../../public/css/login.css";
const Login = () => {
  return (
    <div className='formContainer'>
      <form className="form" action="/login" method="post">
        <h1>Login</h1>
        <div className="uiForm">
          <div className="formField">
            <label><MdEmail className="icon" size="1.5rem"/></label>
            <input type="email" placeholder='Email' name='email' />
          </div>
          <div className="formField">
            <label><IoMdLock className="icon" size="1.5rem"/></label>
            <input type="password" placeholder='Password' name='password' />
          </div>
          <button className="submitButton">ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default Login;