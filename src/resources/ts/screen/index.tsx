import { createRoot } from 'react-dom/client';
import React from 'react';
import Item from '../components/Items';

const headerElement = createRoot(document.getElementById('contents') as HTMLElement);



headerElement.render(
    <>
        <div className="items">
            <Item />
        </div >
    </>
)