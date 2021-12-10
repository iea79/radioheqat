import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Header from './components/Template/Header';
import store from './store';

import { Home } from './pages';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Account from './components/Dashboard/Account';
import History from './components/Dashboard/History';
import ResetPassword from './components/Dashboard/ResetPassword';

import './scss/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="registration" element={<Registration />} />
                        <Route path="dashboard" element={<Dashboard />}>
                            <Route index path="" element={<Account />} />
                            <Route path="history" element={<History />} />
                            <Route path="reset-password" element={<ResetPassword />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
