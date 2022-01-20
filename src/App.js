import  React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setBookPlayed, setLive, setLivePaused, setLivePosition, setFavorites } from './actions/actions';

import './scss/style.scss';


const defaultBook = {
    "id": 1369,
    "title": {
        "rendered": "Կարապետ-բեկի հեքիաթը"
    },
    "author": {
        "name": "Հայ Ժողովրդական Հեքիաթներ",
        "read_by": "Կարդում է Արևիկ Մուրադյանը"
    },
    "media": {
        "cover": "https://adminheqiat.deessemedia.com/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը-mp3-image.jpg",
        "audio": "https://adminheqiat.deessemedia.com/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը.mp3"
    },
};
// "audio": "https://adminheqiat.deessemedia.com/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը.mp3"

function App() {
    const dispatch = useDispatch();
    const [ path, getPathname ] = useState(document.location.pathname);
    const { live } = useSelector(state => state);

    useEffect(() => {
        dispatch(setMessage(false));

        getPathname(document.location.pathname);

    }, [ path, dispatch ]);

    if (live === undefined) {
        dispatch(setBookPlayed(defaultBook));
        dispatch(setLive(true));
        dispatch(setLivePaused(false));
        dispatch(setLivePosition(0));
        dispatch(setFavorites([]));
    }

    return (
        <Outlet />
    );

}

export default App;
