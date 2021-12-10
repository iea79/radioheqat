import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setPassword } from '../../actions/actions';

const Password = ({ placeholder="****", FieldName="user-password" }) => {
    const dispatch = useDispatch();
    const [ passwordShown, setPasswordShown ] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="form__field">
            <input
                type={passwordShown ? "text" : "password"}
                placeholder={placeholder}
                onBlur={e => dispatch(setPassword(e.target.value))}
                name={FieldName}
            />
            <div className="form__icon" onClick={togglePassword}>
                <div className={passwordShown ? "icon_view closed" : "icon_view"}></div>
            </div>
        </div>
    )
}

export default Password;
