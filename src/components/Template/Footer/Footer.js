import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss';

import footerLogo from '../../../assets/img/logo-footer.png';
import footerBg from '../../../assets/img/footer.png';
import appStore from '../../../assets/img/app-store.png';
import googlePlay from '../../../assets/img/google-play.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__bg">
                <img src={footerBg} alt="Background"/>
            </div>
            <div className="footer__content">
                <div className="footer__logo">
                    <img src={footerLogo} alt="Logo"/>
                </div>
                <div className="footer__nav">
                    <div className="footer__item">
                        <div className="footer__header">Հեքիաթների ռադիո</div>
                        <div className="footer__links">
                            <Link to="" >Գաղտնիության քաղաքականություն</Link>
                        </div>
                    </div>
                    <div className="footer__item">
                        <div className="footer__header">Կոնտակտներ</div>
                        <div className="footer__links">
                            <Link to="">Instagram</Link>
                            <Link to="">Youtube</Link>
                        </div>
                    </div>
                    <div className="footer__item">
                        <div className="footer__header">Բջջային հավելված</div>
                        <div className="footer__links">
                            <Link to="">
                                <img src={appStore} alt="App Store"/>
                            </Link>
                            <Link to="">
                                <img src={googlePlay} alt="Google play"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
