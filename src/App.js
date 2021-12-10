// import logo from './logo.svg';
import  React, { useState } from 'react';
import {
    Outlet
  // Routes,
  // Route,
} from "react-router-dom";
// import  Dashboard from './components/Dashboard';
// import  Registration from './components/Registration';
import  Login from './components/Login';
// import  {Home} from './pages';
// import RestService from './services/rest-service';

import './scss/style.scss';

function App() {

    const isHome = () => {
        let check = false,
            url = document.location.pathname;

        if (url === "/") {
            check = true;
        }

        return check;
    }

    const [token, setToken] = useState();

    // console.log(token);

    if (!isHome() && token) {
        return <Login setToken={setToken} />
    }

    return (
        <Outlet />
    )
}

export default App;
