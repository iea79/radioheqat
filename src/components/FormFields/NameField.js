import React from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../../actions/actions';

const NameField = () => {
    const dispatch = useDispatch();

    return (
        <div className="form__field">
            <input
                type="text"
                name="user-name"
                placeholder="Your name"
                onBlur={e => dispatch(setName(e.target.value))}
            />
            <div className="form__icon">
                <div className="icon_user"></div>
            </div>
        </div>
    )
}

export default NameField;
