import React, { useState, useEffect } from 'react';
import appStore from '../../../assets/img/app-store.png';
import googlePlay from '../../../assets/img/google-play.png';
import RestService from '../../../services/RestService';

const restService = new RestService();

const AppMenu = () => {
    const [ menu, setMenu ] = useState(null);

    useEffect(() => {
        if (!menu) {
            restService.getAppMenu().then(json => {
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
            <div className="footer__header">Բջջային հավելված</div>
            <div className="footer__links">
                {
                    menu.map(({ classes, title, url, ID }) => {
                        let img = <img src={ googlePlay } alt={ title }/>;
                        if ( classes[0] === 'appstore' ) {
                            img = <img src={ appStore } alt={ title }/>;
                        }
                        return (
                            <a rel="noreferrer" target="__blank" key={ ID } href={ url }>
                                { img }
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AppMenu;
