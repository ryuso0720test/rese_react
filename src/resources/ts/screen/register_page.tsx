import React from 'react';
import Register from '../components/Register';
import { createRoot } from 'react-dom/client';

const csrf_token = document.head.querySelector('meta[name="csrf-token"]');
const root = createRoot(document.getElementById('register-content') as HTMLElement);


root.render (
    <React.StrictMode>
        <Register_page />
    </React.StrictMode>
)


function Register_page() {
    return (
        <div>
            <Register />
        </div>
    );
}
export default Register_page;

