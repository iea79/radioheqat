import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { Password, NameField, EmailField } from '../FormFields';
// import {Dashboard} from '../Dashboard';
import { getToken, setMessage, setMessageType, setEmail, setName, setUserId, setPassword } from '../../actions/actions';
import RestService from '../../services/RestService';
import Message from '../Message';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => data[key] = value);
        const register = await restService.registerUser(data);
        console.log(register);

        if (!register.success) {
            dispatch(setMessage(false));
            if (register.error) {
                dispatch(setMessage(register.error));
            }
            if (register.data && register.data.message) {
                dispatch(setMessage(register.data.message));
            }
        } else {
            const { user_email, ID, display_name } = register.user;

            dispatch(getToken(register.jwt));
            dispatch(setEmail(user_email));
            dispatch(setName(display_name));
            dispatch(setUserId(ID));
            dispatch(setPassword(data['password']));
            // dispatch(setFavorites(auth.books_favorites));
            navigate('/dashboard/');
            dispatch(setMessage(register.message));
            dispatch(setMessageType('success'));
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
                        <Password name="password"/>
                        <Password name="confirm-password" />
                    </div>
                    <div className="form__action">
                        <button className="btn" type="submit">Գրանցվել</button>
                        <div className="form__privacy">Ստեղծելով հաշիվ՝ դուք համաձայնում եք {' '}
                            <Link to="/policy">գաղտնիության քաղաքականությանը</Link>
                        </div>
                    </div>
                </form>
                <Message />
            </div>
        </main>
    )
}

export default Registration;
