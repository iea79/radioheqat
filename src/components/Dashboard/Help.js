import React from 'react';

import './Help.scss';

const Help = () => {
    return (
        <div className="whiteBox">
            <div className="helpForm">
                <div className="form__label">Please write your appeal in the box below</div>
                <form action="" className="">
                    <div className="form__row">
                        <textarea placeholder="Start typing..."></textarea>
                    </div>
                    <button className="btn btn_link">Send an appeal</button>
                </form>
            </div>
        </div>
    )
}

export default Help;
