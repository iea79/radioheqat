import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from '../../../assets/img/logo.png';
import RestService from '../../../services/RestService';
import parser from 'html-react-parser';

const restService = new RestService();

const Header = () => {
    const [ menu, setMenu ] = useState([]);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { token } = useSelector(state => state);

    useEffect(() => {
        if (!menu.length) {
            restService.getMenu().then(menu => {
                // console.log(menu);
                setMenu(menu);
                // if (menu.success) {
                // }
            })
        }
        // console.log(menuOpen);
    }, [ menu, token, menuOpen ]);

    const wrappedLetter = (string) => {
        let newstr = '';
        for (var i = 0; i < string.length; i++) {
            if (string[i] === ' ') {
                newstr += `&nbsp`;
            } else if (string[i] === 'ո') {
                newstr += `<span>${string[i]}`;
            } else if (string[i] === 'ւ') {
                newstr += `${string[i]}</span>`;
            } else {
                newstr += `<span>${string[i]}</span>`;
            }
        }
        return newstr;
    }

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="logo">
                    <img src={logo} alt={"logo"}/>
                </Link>

                <div className={menuOpen ? 'menu__toggle active' : 'menu__toggle'} onClick={() => {setMenuOpen(!menuOpen)}}></div>

                <ul className={menuOpen ? 'menu open' : 'menu'}>
                    {
                        menu ? menu.map(({url, title}, i) => (
                            !token ?
                                url !== '/dashboard/' ?
                                <li className="menu__item" key={i}>
                                    <NavLink to={ url } className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={() => {setMenuOpen(!menuOpen)}}>{ parser(wrappedLetter(title)) }</NavLink>
                                </li> : ''
                            :
                                url !== '/login' ?
                                <li className="menu__item" key={i}>
                                    <NavLink to={ url } className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={() => {setMenuOpen(!menuOpen)}}>{ parser(wrappedLetter(title)) }</NavLink>
                                </li> : ''

                        )) : ''
                    }
                </ul>
            </nav>
        </header>
    )
}

// Авторизоваться: Щиток приборов: дом Все книги о нас Подписывайся: входить

export default Header;
