import React from 'react';

const NameField = () => {
    return (
        <div className="form__field">
            <input
                type="text"
                name="username"
                placeholder="Your name"
            />
            <div className="form__icon">
                <div className="icon_user"></div>
            </div>
        </div>
    )
}

export default NameField;
