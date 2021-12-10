const Account = () => {
    return (
        <div className="whiteBox">
            <div className="whiteBox__head">My information</div>
            <div className="whiteBox__body">
                <div className="userData">
                    <div className="userData__row">
                        <div className="userData__label">NAME: </div>
                        <div className="userData__prop">Lana Vlasova</div>
                    </div>
                    <div className="userData__row">
                        <div className="userData__label">TEL:</div>
                        <div className="userData__prop"></div>
                    </div>
                </div>
            </div>
            <div className="whiteBox__footer"></div>
        </div>
    )
}

export default Account;
