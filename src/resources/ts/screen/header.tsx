import { createRoot } from 'react-dom/client';
import React from 'react';
import Header from "../components/Header";

const headerElement = createRoot(document.getElementById('header') as HTMLElement);

headerElement.render(
    <Header />,
)