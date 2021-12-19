import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import { logOut } from '../../actions/actions';
import { useDispatch } from 'react-redux';

const Dashboard = () => {

    const dispatch = useDispatch();

    return (
        <main className="main">
            <div className="dashboard">
                <Breadcrumbs/>

                <div className="page__title">Գրքի անվանումը</div>
                <div className="dashboard__body">
                    <div className="dashboard__nav">
                        <ul>
                            <li>
                                <NavLink to="/dashboard/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="icon_user"></i> My Account</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/history" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="icon_clock"></i> History</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reset-password" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="icon_lock"></i> Փոխել գաղտնաբառը</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/list" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="icon_star"></i> My list</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/help" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="icon_comment"></i> Need help</NavLink>
                            </li>
                            <li>
                                <NavLink to="/" onClick={() => dispatch(logOut())}><i className="icon_logout"></i> Log Out</NavLink>
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
