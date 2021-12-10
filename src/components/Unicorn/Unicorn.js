import React from 'react';
// import {ReactComponent as UnicornBg} from '../../assets/img/login-bg.svg';
import UnicornBg from '../../assets/img/unicorn.png';

const Unicorn = () => {
    return (
        <div className="loginBg">
            {/*<UnicornBg />*/}
            <img src={UnicornBg} alt=""/>
        </div>
    )
}

export default Unicorn;
