import { FC,useState,useRef } from "react";
import "../../../public/css/app.css";
import React from "react";

type Props = {
  open: boolean;
  id: string;
};

export const Navigation: FC<Props> = ({ open, id }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const metaCsrfToken = document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement;

  const csrfToken = useRef<string>(metaCsrfToken.content);

  return (
    <nav id={id} aria-hidden={!open} className="navigation">
      <ul>
        <li>Home</li>
        <li><a href="http:/register">Registration</a></li>
        <li>
          {isLoggedIn ? (
            <form action="/logout" method="post">
              <input type="hidden" name="_token" value={ csrfToken.current } />
              <button onClick={handleLogout}>ログアウト</button>
            </form>
          ) : (
              <form action="/login" method="post">
                <input type="hidden" name="_token" value={ csrfToken.current } />
                <button onClick={handleLogin}>ログイン</button>
            </form>
          )}
        </li>
      </ul>
    </nav>
  );
};