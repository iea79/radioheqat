// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RestService from '../../services/RestService';
import { Password, EmailField } from '../FormFields';
import * as actions from '../../actions/actions';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Login = () => {

    const { userEmail, userPassword } = useSelector((state) => state);

    const handleSubmit = async e => {
        e.preventDefault();
        const token = restService.loginUser({
            useremail: userEmail,
            usepassword: userPassword,
        });
        actions.getToken(token);
    }

    return (
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
        </div>
    )
}

export default Login;
