import { createRoot } from 'react-dom/client';
import React from 'react';
import Item from './components/Items';
import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'

const headerElement = createRoot(document.getElementById('contents') as HTMLElement);



headerElement.render(
    // <>
    //     <div className="items">
    //         <Item />
    //     </div >
    // </>
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </React.StrictMode>
)