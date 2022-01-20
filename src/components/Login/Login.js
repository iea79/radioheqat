// import React, { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RestService from '../../services/RestService';
import { Password, EmailField } from '../FormFields';
// import { Dashboard } from '../Dashboard';
import { getToken, setMessage, setPhone, setEmail, setName, setUserId, setFavorites, setPassword, logOut, setLoader } from '../../actions/actions';
// import Message from '../Message';

import Unicorn from '../Unicorn';

const restService = new RestService();

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(setLoader(true));
        let data = {};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => data[key] = value);
        let auth = await restService.authUser(data)
                    .then(json => {
                        console.log(json);
                        return json;
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch(setLoader(false));
                    });

        if (auth.success) {
            dispatch(setLoader(false));
            const { jwt } = auth.data;
            restService.loginUser(jwt).then(resp => {
                console.log('loginUser', resp);
            })
            restService.validateToken(jwt).then(resp => {
                console.log('validateToken', resp);
                if (resp.success) {
                    const { user_email, ID, display_name } = resp.data.user;
                    dispatch(getToken(jwt));
                    dispatch(setEmail(user_email));
                    dispatch(setName(display_name));
                    dispatch(setUserId(ID));
                    dispatch(setPassword(data['password']));
                    dispatch(setLoader(false));

                    restService.getUser(ID, jwt).then(resp => {
                        console.log(resp);
                        dispatch(setPhone(resp.phone));
                        dispatch(setFavorites(resp.favorites));

                        // restService.getFavoriteList(ID).then(json => {
                        //     console.log(json);
                        // });
                    });
                    dispatch(setLoader(false));
                    navigate('/dashboard/');
                } else {
                    dispatch(logOut());
                }
            });
        } else {
            dispatch(setMessage(auth.data.message));
            dispatch(setLoader(false));
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
                        <EmailField name="email" placeholder="Email" />
                    </div>
                    <div className="form__row">
                        <Password placeholder="Password" name="password" />
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
        </main>
    )
}

export default Login;
