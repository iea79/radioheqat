import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";
import PropTypes from 'prop-types';
// import Unicorn from '../Unicorn';

async function loginUser(credentials) {
    return fetch('http://localhost:3004/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

const Login = ({ setToken }) => {
    const [useremail, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            useremail,
            password
        });
        setToken(token);
    }

    return (
        <div className="login">
            {/*<Unicorn />*/}
            <form className="form" onSubmit={handleSubmit}>
                <legend className="form__title">Բարի վերադարձ</legend>
                <div className="form__sub">Խնդրում ենք մուտքագրել ձեր տվյալները</div>
                <div className="form__row">
                    <div className="form__field">
                        <input
                            type="email"
                            name="user-email"
                            placeholder="Email"
                            onChange={e => setUserName(e.target.value)}
                            />
                        <div className="form__icon"></div>
                    </div>
                </div>
                <div className="form__row">
                    <div className="form__field">
                        <input
                            type="password"
                            name="user-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="form__icon"></div>
                    </div>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};


export default Login;
