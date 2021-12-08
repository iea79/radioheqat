// import logo from './logo.svg';
import  React, { useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import  Dashboard from './components/Dashboard';
import  Registration from './components/Registration';
import  Login from './components/Login';
import  {Home} from './pages';


import './scss/style.scss';

function App() {
    const isHome = () => {
        let check = false;
        if (document.location.pathname === "/") {
            check = true;
            console.log('is home');
        }
        return check;
    }
    const [token, setToken] = useState();

    console.log(token);

    if (!isHome() && !token) {
        return <Login setToken={setToken} />
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
    );
}

export default App;
