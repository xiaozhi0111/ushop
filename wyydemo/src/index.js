//引入react核心模块。
import React from 'react';
//引入
import ReactDOM from 'react-dom';
//全局引入rem
import './assets/js/rem';
//去全局引入重置样式。
import './assets/css/reset.css';

import App from './App.js';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App></App>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);

// import {HashRouter} from 'react-router-dom';

// ReactDOM.render(
//     <HashRouter>
//         <React.StrictMode>
//             <App></App>
//         </React.StrictMode>
//     </HashRouter>
//     , document.getElementById('root'));