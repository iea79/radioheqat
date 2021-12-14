import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { setError } from '../../actions/actions';

const Error = () => {
    const textError = useSelector(state => state.error);
    const dispatch = useDispatch();

    const showError = () => {
        let errorText = "";
        if (textError) {
            errorText = <div className="error__item" onClick={() => dispatch(setError(false))}>{textError}<span className="error__close"></span></div>
        }
        return <div className="error">{errorText}</div>
    }

    return showError();
}

export default Error;
