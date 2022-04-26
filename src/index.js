import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Header from './components/Template/Header';
import Footer from './components/Template/Footer';
import store from './store';
import Message from './components/Message';
import Loader from './components/Loader';
import LivePlayer from './components/LivePlayer/LivePlayer';
import LiveBtn from './components/LiveBtn/LiveBtn';
import StartScreen from './components/StartScreen';

import { Home, Books, BookPage, SinglePage, BookSorting } from './pages';
import Login from './components/Login';
import Registration from './components/Registration';
import { Dashboard, Account, History, ResetPassword, Favorites, Help } from './components/Dashboard';
import NotFound from './pages/Error/404';

import './scss/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} >
                        <Route path=":sortName" element={<BookSorting />} />
                    </Route>
                    <Route path="book/:bookId" element={<BookPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path=":slugName" element={<SinglePage />} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<Account />} />
                        <Route path="history" element={<History />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="help" element={<Help />} />
                    </Route>
                </Route>
                <Route path="404" element={<NotFound />} />
            </Routes>
            <Message />
            <Footer />
            <Loader />
            <LivePlayer />
            <LiveBtn />
            <StartScreen />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
