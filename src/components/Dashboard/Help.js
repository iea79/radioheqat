import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setMessageType } from '../../actions/actions';

import './Help.scss';

const Help = () => {
    const { userName, userEmail, token } = useSelector(state => state);
    const dispatch = useDispatch();

    const appealSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch(`http://radioheqatrest.frontendie.ru/wp-json/contact-form-7/v1/contact-forms/37/feedback`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData
        })
        .then(data => data.json())
        .then(resp => {
            console.log(resp);
            console.log(resp.message);
            console.log(resp.status);
            if (resp.status === "validation_failed") {
                dispatch(setMessage(resp.message));
                dispatch(setMessageType(false));
            } else {
                dispatch(setMessage(resp.message));
                dispatch(setMessageType('success'));
                form.reset();
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    // const handleMessage = e =>  {
    //     dispatch(setMessage(e.target.value))
    // };

    return (
        <div className="whiteBox">
            <div className="helpForm">
                <div className="form__label">Please write your appeal in the box below</div>
                <form className="" onSubmit={(e) => {appealSubmit(e)}}>
                    <input type="hidden" name="your-name" value={ userName } />
                    <input type="hidden" name="your-email" value={ userEmail } />
                    <div className="form__row">
                        <textarea name="your-message" placeholder="Start typing..."></textarea>
                    </div>
                    <button className="btn btn_link">Send an appeal</button>
                </form>
            </div>
        </div>
    )
}

export default Help;
