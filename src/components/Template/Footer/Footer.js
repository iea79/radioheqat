import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocMenu from './SocMenu';
import AppMenu from './AppMenu';
import './Footer.scss';

import footerLogo from '../../../assets/img/logo-footer.png';
import footerBg from '../../../assets/img/footer.png';
import apples from '../../../assets/img/apples.png';
import footerLogoWp from '../../../assets/img/logo-footer.webp';
import footerBgWp from '../../../assets/img/footer.webp';

const Footer = () => {
    const history = useNavigate();
    const [path, getPathname] = useState();

    useEffect(() => {
        const pathname = ["/login", "/registration"].includes(document.location.pathname);
        if (!pathname) {
            getPathname(true);
        } else {
            getPathname(false);
        }
    }, [ history ]);

    return !path ? '' : (
        <footer className="footer">
            <picture className="footer__bg">
                <source srcSet={footerBgWp} type="image/webp" />
                <img src={footerBg} alt="Background"/>
            </picture>
            <picture className="footer__apples">
                <img src={apples} alt=""/>
            </picture>
            <div className="footer__content">
                <picture className="footer__logo">
                    <source srcSet={footerLogoWp} type="image/webp" />
                    <img src={footerLogo} alt="Logo"/>
                </picture>
                <div className="footer__nav">
                    <div className="footer__item">
                        <div className="footer__header">Հեքիաթների ռադիո</div>
                        <div className="footer__links">
                            <Link to="/privacy-policy" >Գաղտնիության քաղաքականություն</Link>
                        </div>
                    </div>
                    <SocMenu />
                    <AppMenu />
                </div>
            </div>
        </footer>
    )
}

export default Footer;
