import {
  NavLink,
  Link,
} from "react-router-dom";
import logo from '../../../assets/img/logo.png';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">

                <Link to="/" className="logo">
                    <img src={logo} alt={"logo"}/>
                </Link>

                <ul className="menu">
                    <li className="menu__item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Տուն</NavLink>{/*Home*/}
                    </li>
                    <li className="menu__item">
                        <NavLink to="/books"  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Բոլոր գրքերը</NavLink>{/*All books*/}
                    </li>
                    {/*<li className="menu__item">
                        <NavLink to="/about"  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Մեր մասին</NavLink>
                    </li>*/}
                    <li className="menu__item">
                        <NavLink to="/dashboard/"  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Բաժանորդագրվել</NavLink>{/*Dashboard*/}
                    </li>
                    <li className="menu__item">
                        <NavLink to="/login"  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Մուտք գործել </NavLink>{/*Login*/}
                    </li>
                </ul>

            </nav>
        </header>
    )
}

// Авторизоваться: Щиток приборов: дом Все книги о нас Подписывайся: входить

export default Header;
