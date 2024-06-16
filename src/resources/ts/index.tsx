import { createRoot } from 'react-dom/client';
// import React from 'react';
// import App from './App';

// const root = createRoot(document.getElementById('app') as HTMLElement);
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

import React from "react";
import Login from './components/Login';
// import title from './components/title';
const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
    <React.StrictMode>
        <Login />
        <h1>qqqqqq</h1>
        <div>
            <title />
        </div>

    </React.StrictMode>
)