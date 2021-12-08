import {
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
                        <Link to="/" className="menu__link">Տուն</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="#" className="menu__link">Բոլոր գրքերը</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="#" className="menu__link">Մեր մասին</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/dashboard" className="menu__link">Բաժանորդագրվել</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/login" className="menu__link">Մուտք գործել </Link>
                    </li>
                </ul>

            </nav>
        </header>
    )
}

// Авторизоваться: Щиток приборов: дом Все книги о нас Подписывайся: входить

export default Header;
