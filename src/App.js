import  React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import  Login from './components/Login';
import { getToken } from './actions/actions';

import './scss/style.scss';

function App() {
    const navigate = useNavigate();
    const [path, getPathname] = useState(document.location.pathname);
    const state = useSelector(state => state);
    console.log(state);

    // Устанавливаем фейковый токен !!! получить и сразу закомментировать
    // const dispatch = useDispatch();
    // dispatch(getToken('123456'));

    // Получаем токен
    const token = useSelector(state => state.token);


    useEffect(() => {
        // Доступные урлы без токена
        const pathname = ["/", "/books", "/login", "/registration"].includes(document.location.pathname);

        if (!pathname) {
            getPathname(true);
        } else {
            getPathname(false);
        }
    }, [navigate]);

    if (path && !token) {
        navigate('/login');
        return <Login />;
    } else {
        return <Outlet />;
    }

}

export default App;
