import { createRoot } from 'react-dom/client';
import React from 'react';
import "../../../public/css/search.css";
import { CiSearch } from "react-icons/ci";

const headerElement = createRoot(document.getElementById('search') as HTMLElement);

headerElement.render(
    <>
        <form className="search-form" action="/search" method="post">
            <div className="search-content">
                <select name="area" className="search__area">
                    <option value="" >All area</option>
                </select>
                <select name="area" className="search__area">
                    <option value="" >All genre</option>
                </select>
                <CiSearch className="icon" size="1.5rem"/>
                <input type="search" name="search" placeholder="キーワードを入力" />
            </div>
        </form>
    </>,
)