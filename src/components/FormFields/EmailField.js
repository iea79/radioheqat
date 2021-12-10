// import React, { useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../actions/actions';

const EmailField = () => {
    const dispatch = useDispatch();

    return (
        <div className="form__field">
            <input
                type="email"
                name="user-email"
                placeholder="Email"
                onBlur={e => dispatch(setEmail(e.target.value))}
            />
            <div className="form__icon">
                <div className="icon_email"></div>
            </div>
        </div>
    )
}

export default EmailField;
