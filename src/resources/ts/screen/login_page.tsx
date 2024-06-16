import React from 'react';
import Login from '../components/Login';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('login-content') as HTMLElement);

root.render (
    <React.StrictMode>
        <Login_page />
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