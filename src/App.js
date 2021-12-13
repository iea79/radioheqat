// import logo from './logo.svg';
import  React from 'react';
import {
    Outlet
    // Routes,
    // Route,
} from "react-router-dom";
// import  Dashboard from './components/Dashboard';
// import  Registration from './components/Registration';
import { useSelector } from 'react-redux';
import  Login from './components/Login';
// import { setToken } from './actions/actions';
// import  {Home} from './pages';
// import RestService from './services/rest-service';

import './scss/style.scss';

function App() {

    const state = useSelector(state => state);
    const token = useSelector(state => state.token);
    // const dispatch = useDispatch();

    console.log(state);

    const isDashboard = () => {
        let check = false,
            url = document.location.pathname;

        if (url === "/dashboard/") {
            check = true;
        }

        return check;
    }

    // console.log(token);

    if (isDashboard && !token) {
        return <Login />
    } else {
        return <Outlet />;
    }

}

export default App;
