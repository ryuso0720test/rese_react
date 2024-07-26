
import React, { useRef,useState } from "react"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import "../../../public/css/register.css";

function Register() {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: any) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  const metaCsrfToken = document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement;

  const csrfToken = useRef<string>(metaCsrfToken.content);


  return (
    <div className='formContainer'>
      <form className="form"
        method="post"
        action="/register"
         >
        <input type="hidden" name="_token" value={ csrfToken.current } />
        <h1>Register</h1>
        <div className="uiForm">
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
          <button className="submitButton">登録</button>
        </div>
      </form>
    </div>
  )
}

export default Register;