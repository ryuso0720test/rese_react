import React from 'react';
import Login from '../components/Login';
import { createRoot } from 'react-dom/client';
import HeaderOut from "../components//HeaderOut";


const root = createRoot(document.getElementById('login-content') as HTMLElement);

const header = createRoot(document.getElementById('header') as HTMLElement);

root.render (
    <React.StrictMode>
        <Login_page />
    </React.StrictMode>
)

header.render (
    <React.StrictMode>
        <HeaderOut />
    </React.StrictMode>
)


function Login_page() {
    return (
        <div>
            <Login />
        </div>
    );
}
export default Login_page;