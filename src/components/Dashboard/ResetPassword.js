import { Password } from '../FormFields';

const ResetPassword = () => {
    return (
        <div className="whiteBox">
            <div className="whiteBox__head">Change Password</div>
            <div className="whiteBox__body">
                <div className="resetPass">
                    <div className="resetPass__col">
                        <div className="form__label">Current password</div>
                        <Password />
                    </div>
                    <div className="resetPass__col">
                        <div className="form__label">New password</div>
                        <Password FieldName="new-password" />
                    </div>
                    <div className="resetPass__col">
                        <div className="form__label">Repeat password</div>
                        <Password FieldName="confirm-new-password" />
                    </div>
                    <div className="resetPass__action">
                        <button className="btn btn_link" type="submit">Change</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
