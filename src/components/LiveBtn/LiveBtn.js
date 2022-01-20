import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLive } from '../../actions/actions';

import './liveBtn.scss';

const LiveBtn = () => {
    const { live } = useSelector(state => state);
    const dispatch = useDispatch();
    const [ isLive, setIsLive ] = useState(live);

    useEffect(() => {
        if (live) {
            setIsLive(true);
        } else {
            setIsLive(false);
        }
    }, [
        live
    ]);

    return (
        <div
            className=
            {
                isLive ? "liveBtn active" : "liveBtn"
            }
            onClick={() => {
                dispatch(setLive(!live));
            }}>
            <div className="liveBtn__inner">
                <i className="icon_play"></i>
                <i className="icon_pause"></i>
            </div>
        </div>
    )
}

export default LiveBtn;
