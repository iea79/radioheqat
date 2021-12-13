import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {

    const { userName, userEmail } = useSelector(state => state);

    return (
        <div className="whiteBox">
            <div className="whiteBox__head">My information</div>
            <div className="whiteBox__body">
                <div className="userData">
                    <div className="userData__row">
                        <div className="userData__label">NAME: </div>
                        <div className="userData__prop">{userName}</div>
                    </div>
                    <div className="userData__row">
                        <div className="userData__label">TEL:</div>
                        <div className="userData__prop"></div>
                    </div>
                    <div className="userData__row">
                        <div className="userData__label">EMAIL:</div>
                        <div className="userData__prop">{userEmail}</div>
                    </div>
                </div>
            </div>
            <div className="whiteBox__footer"></div>
        </div>
    )
}

export default Account;
