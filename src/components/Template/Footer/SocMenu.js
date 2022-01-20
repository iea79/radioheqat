import React, { useState, useEffect } from 'react';
import RestService from '../../../services/RestService';

const restService = new RestService();

const SocMenu = () => {
    const [ menu, setMenu ] = useState(null);

    useEffect(() => {
        if (!menu) {
            restService.getSocMenu().then(json => {
                // console.log(json);
                if (json.length) {
                    setMenu(json);
                    // console.log(json);
                }
            })
        }
    }, [ menu ]);

    if (!menu) return false;

    return (
        <div className="footer__item">
            <div className="footer__header">Կոնտակտներ</div>
            <div className="footer__links">
                {
                    menu.map(({ url, title, ID }) => (
                        <a target="_blank" rel="noreferrer" key={ ID } href={ url }>{ title }</a>
                    ))
                }
            </div>
        </div>
    )
}

export default SocMenu;
