import React from 'react';

const EmailField = () => {
    return (
        <div className="form__field">
            <input
                type="email"
                name="user-email"
                placeholder="Email"
            />
            <div className="form__icon">
                <div className="icon_email"></div>
            </div>
        </div>
    )
}

export default EmailField;
