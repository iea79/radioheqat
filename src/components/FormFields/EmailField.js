import React from 'react';

const EmailField = ({name="email", placeholder="Email"}) => {
    return (
        <div className="form__field">
            <input
                type="email"
                name={name}
                placeholder={placeholder}
            />
            <div className="form__icon">
                <div className="icon_email"></div>
            </div>
        </div>
    )
}

export default EmailField;
