import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import { logOut } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import RestService from '../../services/RestService';
import { setLoader } from '../../actions/actions';
import Login from '../Login/Login';

const restService = new RestService();


const Dashboard = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state);
    const navigate = useNavigate();
    const [ menu, setMenu ] = useState([]);
    const [ pathname, setPathname ] = useState('');
    const [ pageTitle, setPageTitle ] = useState('');

    useEffect(() => {
        if (!menu.length) {
            dispatch(setLoader(true));
            restService.getDashboardMenu()
            .then(menuArr => {
                setMenu(menuArr);
                dispatch(setLoader(false));
            });
        }
        setPathname(document.location.pathname);
        menu.forEach((item) => {
            if (item.url === pathname) {
                setPageTitle(item.title);
            }
        })
    }, [ navigate, pathname, menu, pageTitle, dispatch ]);

    const handleLogOut = () => {
        restService.revokeToken(token).then(() => {
            // console.log(resp);
            dispatch(logOut());
        })
    }

    // console.log(navigate(document.location.pathname));

    if (!token) return <Login />

    return (
        <main className="main">
            <div className="dashboard">
                <Breadcrumbs title={ pageTitle }/>

                <div className="page__title">{ pageTitle }</div>
                <div className="dashboard__body">
                    <div className="dashboard__nav">
                        <ul>
                            {
                                menu.map(({url, title, classes}, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={ url }
                                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                            <i className={ classes[0] }></i>
                                            <span>{ title }</span>
                                        </NavLink>
                                    </li>
                                ))
                            }
                            <li>
                                <NavLink to="/" onClick={() => { handleLogOut() }}><i className="icon_logout"></i> <span>Log Out</span></NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="dashboard__content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;
