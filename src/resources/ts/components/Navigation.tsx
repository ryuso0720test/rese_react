import { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/css/app.css";
import React from "react";
import axios from 'axios';


const http = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true,
    withXSRFToken: true,
});

type Props = {
  open: boolean;
  id: string;
};

export const Navigation: FC<Props> = ({ open, id }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };
  
  const handleNavLogin = () => {
    navigate('/login')
  };

  const handleMypage = () => {
    navigate('/mypage', {
      state: {
        user_id: userId
      }
    });
  };

  const loginClick = () => {
    navigate('/login')
  };
  const registerClick = () => {
    navigate('/register')
  };
  const homeClick = () => {
    navigate('/')
  };

  const logout = async () => {
        http.post("/fortify/logout", {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
          handleNavLogin();
        }).catch(function (error) {
          console.log('ログアウト失敗');
          handleNavLogin();
        })
  }
  
  const logoutClick = () => {
        logout();
    };


  const fetchAuthUser = async () => {
        axios.get('/api/user').then(response => {
          console.log(response.data.data);
          setUserId(response.data.data);
          handleLogin();
        })
        .catch(() => {
          handleLogout();
        });
    }

  useEffect(() => {
        fetchAuthUser();
    }, []);

  return (
    <nav id={id} aria-hidden={!open} className="navigation">
      <ul>
        <li  style={ { fontSize: "24px" } } onClick={() => homeClick()}>Home</li>
        {isLoggedIn ? (
          <li onClick={() => logoutClick()} style={ { fontSize: "24px" } }>Logout</li>
        ) : (
            <li style={ { fontSize: "24px" } } onClick={() => registerClick()}>Registration</li>
        )}
        {isLoggedIn ? (
          <li style={ { fontSize: "24px" } } onClick={() => handleMypage()} >Mypage</li>
        ) : (
            <li style={ { fontSize: "24px" } } onClick={() => loginClick()}>Login</li>
        ) }
      </ul>
    </nav>
  );
};