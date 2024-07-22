import { createRoot } from 'react-dom/client';
import Item from './components/Items';
import { AppRoutes } from './Routes';
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter } from 'react-router-dom'

const headerElement = createRoot(document.getElementById('contents') as HTMLElement);

headerElement.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </React.StrictMode>
)