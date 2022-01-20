import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { setLive, setLivePaused } from '../../actions/actions';
import Bar from '../../assets/img/audiobar1.svg';

import './Player.scss';

const AudioPlayer = (props) => {
    // console.log(props);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { live, livePaused } = useSelector(state => state);
    const { id, path } = props;
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(path));
    // const audioRef = useRef(new Audio());
    const intervalRef = useRef();
    const { duration } = audioRef.current;

    useEffect(() => {
        if (isPlaying) {
            // if (!livePaused && live) {
                dispatch(setLivePaused(true));
                // dispatch(setLive(false));
            // }
            // audioRef.current.play();
            // console.log(path);
            playAudio();
        } else {
            // if (livePaused && live) {
                dispatch(setLivePaused(false));
                // dispatch(setLive(true));
            // }
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [ isPlaying ]);

    // useEffect(() => {
    //     setIsPlaying(false);
    // }, [navigate])

    const playPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    const playAudio = () => {
        const promise = audioRef.current.play();
        promise.then(() => {
            startTimer();
        }).catch(() => {
            audioRef.current.muted = true;
            audioRef.current.play();
            audioRef.current.muted = false;
            startTimer();
        })
    }

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current) {
                setTrackProgress(audioRef.current.currentTime);

                audioRef.current.onended = () => {
                    setIsPlaying(false);
                }
            }
        }, [1000]);
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }


    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';

    // console.log(props);
    return (
        <div className="player" key={'book-' + id}>
            <audio src={path ? path : ''} ref={audioRef}></audio>
            <div className="player__btn" onClick={() => {playPause()}}>
                { isPlaying ? <i className="icon_pause"></i> : <i className="icon_play"></i> }
            </div>
            <div
                className="player__progress"
                >
                <div className="player__bar" style={{ width: currentPercentage }}></div>
                <img src={Bar} alt=""/>
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="player__bar"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    />
            </div>
        </div>
    )
}

export default AudioPlayer;
