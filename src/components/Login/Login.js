// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RestService from '../../services/RestService';
import { Password, EmailField } from '../FormFields';
import {Dashboard} from '../Dashboard';
import { getToken, setError } from '../../actions/actions';
import Error from '../Error';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Login = () => {

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => data[key] = value);
        const auth = await restService.loginUser(data);
        console.log(auth);

        if (auth.error) {
            dispatch(setError(auth.error));
        }

        if (auth.token) {
            dispatch(getToken(auth.token));
            dispatch(setError(false));
            return <Dashboard />;
        }
    }

    return (
        <main className="main">
            <div className="login">
                <Unicorn />
                <form className="form" onSubmit={handleSubmit}>
                    <legend className="form__title">Բարի վերադարձ</legend>
                    <div className="form__sub">Խնդրում ենք մուտքագրել ձեր տվյալները</div>
                    <div className="form__row">
                        <EmailField />
                    </div>
                    <div className="form__row">
                        <Password placeholder="Password" />
                    </div>
                    <div className="form__action form__action_inline">
                        <button className="btn" type="submit">մուտք գործել</button>
                        <div className="form__privacy">Մոռացել եք Ձեր գաղտնաբառը?</div>
                    </div>

                    <div className="form__footer">
                        <div className="form__info">Don't have an account yet? {' '}
                            <Link to="/registration"> Create Account</Link>
                        </div>
                    </div>
                </form>
                <Error />
            </div>
        </main>
    )
}

export default Login;
