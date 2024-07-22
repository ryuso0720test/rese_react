import React from 'react'
import { FC, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { NavigationOut } from "./NavigationOut";
import "../../../public/css/app.css";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleFunction = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <ToggleButton
        open={open}
        controls="navigation"
        label="メニューを開きます"
        onClick={toggleFunction}
      />
      <NavigationOut id="navigation" open={open} />
      <h1 className='title'>Rese</h1>
    </header>
  );
};
export default Header;
