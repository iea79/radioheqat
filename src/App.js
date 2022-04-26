import  React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setBookPlayed, setLive, setLivePaused, setLivePosition, setFavorites, setLiveLoader } from './actions/actions';
// import useInteraction from './actions/useInteraction';

import './scss/style.scss';

const audio = process.env.PUBLIC_URL + "/20211231_6930826265517758107.mp3";

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
        "cover": "https://radioheqiat.fm/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը-mp3-image.jpg",
        "audio": audio
        // "audio": "https://radioheqiat.fm/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը.mp3"
    },
};
// "audio": "https://adminheqiat.deessemedia.com/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը.mp3"

function App() {
    const dispatch = useDispatch();
    const [ path, getPathname ] = useState(document.location.pathname);
    const { live } = useSelector(state => state);
    // const interacted = useInteraction();

    useEffect(() => {
        dispatch(setMessage(false));

        getPathname(document.location.pathname);

        // console.log('interacted', interacted);

    }, [ path, dispatch ]);

    if (live === undefined) {
        dispatch(setBookPlayed(defaultBook));
        dispatch(setLive(true));
        dispatch(setLivePaused(false));
        dispatch(setLivePosition(0));
        dispatch(setFavorites([]));
        dispatch(setLiveLoader(true));
    }

    return (
        <Outlet />
    );

}

export default App;
