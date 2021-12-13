import React from 'react';
import {useSelector} from 'react-redux';

const Error = () => {
    const textError = useSelector(state => state.error);

    const showError = () => {
        if (textError) {
            return <div className="error">{textError}</div>
        }
    }

    return showError;
}

export default Error;
