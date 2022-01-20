import React from 'react';
// import RestService from '../../services/RestService';
import { useSelector, useDispatch } from 'react-redux';
import { setLive } from '../../actions/actions';

const HomePlayer = () => {
    const dispatch = useDispatch();
    const { live, bookPlayed, liveDuration, livePosition } = useSelector(state => state);
    const { media: { cover }, author: { name }, title } = bookPlayed;
    const duration = liveDuration;

    const playPause = () => {
        dispatch(setLive(!live));
    }

    const onScrub = (value) => {
        // console.log('onScrub', value);
        // dispatch(setLivePosition(value));
        // dispatch(setLivePaused(false));
        // setIsPlaying(!livePaused);
    }

    const currentPercentage = duration ? `${(livePosition / duration) * 100}%` : '0%';

    return (
        <div className="player">
            {
                cover ? <div className="player__cover"><img src={ cover } alt={ title.rendered } /></div> : ''
            }
            <div className="player__wrap">
                <div className="player__btn" onClick={() => { playPause() }}>
                    { live ? <i className="icon_pause"></i> : <i className="icon_play"></i> }
                </div>
                <div className="player__descr">
                    <div className="player__top">{ title.rendered } <span className="live">* Ապրեք</span></div>
                    <div className="player__author">{ name }</div>
                </div>
                <div
                    className="player__progress"
                    >
                    <div className="player__bar" style={{ width: currentPercentage }}></div>
                    <input
                        type="range"
                        value={livePosition}
                        step="1"
                        min="0"
                        max={duration ? duration : `${duration}`}
                        className="player__bar"
                        onChange={(e) => onScrub(e.target.value)}
                        />
                </div>
            </div>
        </div>
    )
    // if (props.book) {
    // } else {
    //     return false;
    // }
}

export default HomePlayer;
