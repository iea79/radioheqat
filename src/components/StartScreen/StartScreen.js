import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLive, setLiveScreen } from '../../actions/actions';

import './startScreen.scss'
const bg = process.env.PUBLIC_URL + "/start-screen.jpg";

const StartScreen = () => {
    const dispatch = useDispatch();
    const { live, liveScreen } = useSelector(state => state);

    if (liveScreen === undefined) {
        dispatch(setLiveScreen(true));
    }

    const hideScreen = () => {
        dispatch(setLive(true));
        dispatch(setLiveScreen(false));
    }

    return (
        liveScreen ? <div
            className="startScreen"
            onClick={() => {hideScreen()}}
            >
            <div className="startScreen__bg">
                <img src={bg} alt=""/>
            </div>
            <div className="startScreen__content">
                <div className="startScreen__title">Արդյոք դա էր, չէ՞</div>
                <div className="startScreen__btn">
                    <div className="icon_prev"></div>
                </div>
            </div>
        </div> : ''
    )
}

export default StartScreen;
