import React from 'react';
import {
  Link,
} from "react-router-dom";
// import Unicorn from '../Unicorn';

const Registration = () => {
    return (
        <div className="login">
            {/*{<Unicorn />*/}
            <form className="form">
                <legend className="form__title">Գրանցվել</legend>
                <div className="form__sub">Let’s create your account</div>
                <div className="form__row">
                    <div className="form__field">
                        <input type="text" name="user-name" placeholder="User name"/>
                        <div className="form__icon"></div>
                    </div>
                </div>
                <div className="form__row">
                    <div className="form__field">
                        <input type="email" name="user-email" placeholder="Email"/>
                        <div className="form__icon"></div>
                    </div>
                </div>
                <div className="form__row form__row_inline">
                    <div className="form__field">
                        <input type="password" name="user-password" placeholder="Password"/>
                        <div className="form__icon"></div>
                    </div>
                    <div className="form__field">
                        <input type="password" name="user-password-confirm" placeholder="Confirn"/>
                        <div className="form__icon"></div>
                    </div>
                </div>
                <div className="form__action">
                    <button className="btn" type="submit">Գրանցվել</button>
                    <div className="form__privacy">Ստեղծելով հաշիվ՝ դուք համաձայնում եք {' '}
                        <Link to="/policy">գաղտնիության քաղաքականությանը</Link>
                    </div>
                </div>

                {/*<div className="form__footer">
                    <div className="form__info">Or
                        <Link to="/login"> Log in</Link>
                    </div>
                </div>*/}
            </form>
        </div>
    )
}

export default Registration;
