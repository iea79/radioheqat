import { useSelector, useDispatch } from 'react-redux';
import { Password } from '../FormFields';
import RestService from '../../services/RestService';
import { setMessage, setMessageType, setPassword } from '../../actions/actions';

const restService = new RestService();

const ResetPassword = () => {

    const { token, userEmail, userPassword } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.forEach((value, key) => data[key] = value);

        if (data['userpassword'] !== userPassword ) {
            dispatch(setMessage("Wrong current password"));
            return false;
        }

        restService.editPassword(data, userEmail, token)
        .then(resp => {
            console.log(resp);
            if (!resp.success) {
                dispatch(setMessageType(false));
                dispatch(setMessage(resp.message));
            } else {
                dispatch(setPassword(data['newpassword']));
                dispatch(setMessageType("success"));
                dispatch(setMessage("Your password changed"));
                form.reset();
            }
            if (resp.error) {
                dispatch(setMessageType(false));
                dispatch(setMessage(resp.error));
            }
        })
        .catch(err => {
            console.log(err);
        });


    }

    return (
        <div className="whiteBox">
            <div className="whiteBox__head">Change Password</div>
            <div className="whiteBox__body">
                <form className="resetPass" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="resetPass__col">
                        <div className="form__label">Current password</div>
                        <Password />
                    </div>
                    <div className="resetPass__col">
                        <div className="form__label">New password</div>
                        <Password name="newpassword" />
                    </div>
                    <div className="resetPass__col">
                        <div className="form__label">Repeat password</div>
                        <Password name="confirm-password" />
                    </div>
                    <div className="resetPass__action">
                        <button className="btn btn_link" type="submit">Change</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
