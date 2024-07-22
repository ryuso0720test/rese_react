import { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/css/app.css";
import React from "react";
import axios from 'axios';


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

  const metaCsrfToken = document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement;

  const csrfToken = useRef<string>(metaCsrfToken.content);


  const fetchAuthUser = async () => {
        axios.get('/api/user').then(response => {
          console.log('ユーザー情報取得成功');
          console.log(response.data.data);
          setUserId(response.data.data);
          handleLogin();
        })
        .catch(() => {
          console.log('ユーザー情報取得に失敗しました');
          handleLogout();
        });
    }

  useEffect(() => {
        fetchAuthUser();
    }, []);

  return (
    <nav id={id} aria-hidden={!open} className="navigation">
      <ul>
        <li>Home</li>
        <li>
          <form name="logout" action="/logout" method="post">
              <input type="hidden" name="_token" value={ csrfToken.current } />
              <a onClick={handleNavLogin}>Logout</a>
          </form>
          {/* {isLoggedIn ? (
            <form action="/logout" method="post">
              <input type="hidden" name="_token" value={ csrfToken.current } />
              <button onClick={handleLogout}>Logout</button>
            </form>
          ) : (
              <form action="/login" method="post">
                <input type="hidden" name="_token" value={ csrfToken.current } />
                <button onClick={handleLogin}>Login</button>
              </form>
          )} */}
        </li>
        <li onClick={handleMypage}>Mypage</li>
      </ul>
    </nav>
  );
};