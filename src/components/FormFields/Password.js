import { useState } from "react";

const Password = ({ placeholder="****", FieldName="user-password" }) => {

    const [ passwordShown, setPasswordShown ] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="form__field">
            <input
                type={passwordShown ? "text" : "password"}
                placeholder={placeholder}
                name={FieldName}
            />
            <div className="form__icon" onClick={togglePassword}>
                <div className={passwordShown ? "icon_view closed" : "icon_view"}></div>
            </div>
        </div>
    )
}

export default Password;
