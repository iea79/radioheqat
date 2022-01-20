import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPhone } from '../../actions/actions';
import RestService from '../../services/RestService';

const restService = new RestService();

const Account = () => {
    const { userName, userEmail, userPhone, userId, token } = useSelector(state => state);
    const dispatch = useDispatch();
    const [ name, editName ] = useState(null);
    const [ nameEdited, openNameEdit ] = useState(false);
    const [ phone, editPhone ] = useState(null);
    const [ phoneEdited, openPhoneEdit ] = useState(false);

    useEffect(() => {
        // editName(userName);
        // editEmail(userEmail);
        // console.log(name, phone, email);
    }, [ name, phone, nameEdited ]);

    const handleEditName = (e) => {
        e.preventDefault();
        dispatch(setName(name));
        restService.editName(userId, name, token).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });
        openNameEdit(false);
    };

    const handleEditPhone = (e) => {
        e.preventDefault();
        dispatch(setPhone(phone));
        restService.editPhone(userId, phone, token).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });
        openPhoneEdit(false);
    };

    return (
        <div className="whiteBox">
            <div className="whiteBox__head">My information</div>
            <div className="whiteBox__body">
                <div className="userData">
                    {
                        nameEdited ? (
                        <div className="userData__row">
                            <form className="userData__form" onSubmit={(e) => { handleEditName(e) }}>
                                <div className="userData__label">NAME: </div>
                                <input type="text" onInput={(e) => {editName(e.target.value)}}/>
                                <button type="submit" className="userData__save icon_input-checked"></button>
                                <i className="userData__decline" onClick={() => { openNameEdit(!nameEdited) }}></i>
                            </form>
                        </div>
                        ) : (
                        <div className="userData__row">
                            <div className="userData__label">NAME: </div>
                            <div className="userData__prop">{ name ? name : userName }</div>
                            <div className="userData__edit icon_edit-pencil" onClick={() => { openNameEdit(!nameEdited) }}></div>
                        </div>
                        )
                    }
                    {
                        phoneEdited ? (
                        <div className="userData__row">
                            <form className="userData__form" onSubmit={(e) => { handleEditPhone(e) }}>
                                <div className="userData__label">TEL: </div>
                                <input type="text" onInput={(e) => {editPhone(e.target.value)}}/>
                                <button type="submit" className="userData__save icon_input-checked"></button>
                                <i className="userData__decline" onClick={() => { openPhoneEdit(!phoneEdited) }}></i>
                            </form>
                        </div>
                        ) : (
                        <div className="userData__row">
                            <div className="userData__label">TEL: </div>
                            <div className="userData__prop">{ phone ? phone : userPhone }</div>
                            <div className="userData__edit icon_edit-pencil" onClick={() => { openPhoneEdit(!phoneEdited) }}></div>
                        </div>
                        )
                    }
                    <div className="userData__row">
                        <div className="userData__label">EMAIL: </div>
                        <div className="userData__prop">{ userEmail }</div>
                    </div>
                </div>
            </div>
            <div className="whiteBox__footer"></div>
        </div>
    )
}

export default Account;
