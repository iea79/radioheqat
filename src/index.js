import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Header from './components/Template/Header';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
        <Header />
        <main className="main">
            <App />
        </main>
    </BrowserRouter>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
