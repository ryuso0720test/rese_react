import { FC, useState, useRef, useEffect } from "react";
import "../../../public/css/app.css";
import React from "react";
import axios from 'axios';


type Props = {
  open: boolean;
  id: string;
};

export const NavigationOut: FC<Props> = ({ open, id }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

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
        <li><a href="">Registration</a></li>
        <li><a href="">Login</a></li>
      </ul>
    </nav>
  );
};