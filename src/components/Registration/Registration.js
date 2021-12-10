import React from 'react';
import {
  Link,
} from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Password, NameField, EmailField } from '../FormFields';
import * as actions from '../../actions/actions';
import RestService from '../../services/RestService';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Registration = () => {
    const { userName, userEmail, userPassword } = useSelector((state) => state);

    const handleSubmit = async e => {
        e.preventDefault();
        const token = restService.registerUser({
            username: userName,
            useremail: userEmail,
            usepassword: userPassword,
        });
        await actions.getToken(token);
    }

    return (
        <div className="login">
            <Unicorn />
            <form className="form" onSubmit={handleSubmit}>
                <legend className="form__title">Գրանցվել</legend>
                <div className="form__sub">Let’s create your account</div>
                <div className="form__row">
                    <NameField />
                </div>
                <div className="form__row">
                    <EmailField />
                </div>
                <div className="form__row form__row_inline">
                    <Password />
                    <Password FieldName="confirm-password" />
                </div>
                <div className="form__action">
                    <button className="btn" type="submit">Գրանցվել</button>
                    <div className="form__privacy">Ստեղծելով հաշիվ՝ դուք համաձայնում եք {' '}
                        <Link to="/policy">գաղտնիության քաղաքականությանը</Link>
                    </div>
                </div>

                {/*<div className="form__footer">
                    <div className="form__info">Or {' '}
                        <Link to="/login"> Log in</Link>
                    </div>
                </div>*/}
            </form>
        </div>
    )
}

export default Registration;
