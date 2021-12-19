import React from 'react';
import {
  Link,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { Password, NameField, EmailField } from '../FormFields';
import {Dashboard} from '../Dashboard';
import { getToken, setError } from '../../actions/actions';
import RestService from '../../services/RestService';
import Error from '../Error';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Registration = () => {

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => data[key] = value);
        const register = await restService.registerUser(data);
        console.log(register);

        if (register.error) {
            dispatch(setError(register.error));
        }

        if (register.token) {
            dispatch(getToken(register.token));
            dispatch(setError(false));
            return <Dashboard />;
        }
    }

    return (
        <main className="main">
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
                </form>
                <Error />
            </div>
        </main>
    )
}

export default Registration;
