import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Header from './components/Template/Header';
import Footer from './components/Template/Footer';
import store from './store';

import { Home, Books, BookPage } from './pages';
import Login from './components/Login';
import Registration from './components/Registration';
import { Dashboard, Account, History, ResetPassword, Favorites, Help } from './components/Dashboard';

import './scss/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} />
                    <Route path="books/:bookId" element={<BookPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<Account />} />
                        <Route path="history" element={<History />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="list" element={<Favorites />} />
                        <Route path="help" element={<Help />} />
                    </Route>
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
