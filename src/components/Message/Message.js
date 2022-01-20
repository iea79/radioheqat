import React from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setMessageType } from '../../actions/actions';

import './message.scss';

const Message = () => {
    const { message, messageType } = useSelector(state => state);
    const dispatch = useDispatch();

    const showMessage = () => {
        let messageItem = "";


        if (message) {
            if (messageType) {
                messageItem = <div
                    className="message__item success"
                    onClick={() => {
                        dispatch(setMessage(false));
                        dispatch(setMessageType(false));
                    }}>{parse(message)}<span className="message__close"></span></div>;
            } else {
                messageItem = <div
                    className="message__item"
                    onClick={() => {
                        dispatch(setMessage(false));
                        dispatch(setMessageType(false));
                    }}>{parse(message)}<span className="message__close"></span></div>;
            }
        } else {
            // dispatch(setMessage(false));
            // dispatch(setMessageType(false));

        }

        return <div className="message">{messageItem}</div>
    }

    return showMessage();
}

export default Message;
