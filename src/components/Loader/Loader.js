import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/logo.png';

import  "./loader.scss";

const Loader = () => {
    const [ loader, showLoader ] = useState(true);
    const { loaded } = useSelector(state => state);

    useEffect(() => {
        // console.log('Loader', loaded);
        showLoader(loaded);
    }, [ loaded ]);

    return (
        <div className={loader ? "loader open" : "loader"}>
            <img src={logo} alt=""/>
        </div>
    )
};

export default Loader;
