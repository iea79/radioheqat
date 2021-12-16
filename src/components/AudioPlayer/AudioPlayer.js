import React, { useState, useEffect, useRef } from 'react';
import Bar from '../../assets/img/audiobar1.svg';

import './Player.scss';

// id, path, author

const AudioPlayer = (props) => {
    const { id, path } = props;
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(path));
    const intervalRef = useRef();
    // console.log(audioRef.current);
    const { duration } = audioRef.current;



    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);


    const playPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTrackProgress(audioRef.current.currentTime);
        }, [1000]);
    }

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';

    // console.log(props);
    return (
        <div className="player" id={'player-' + id}>
            <audio ref={audioRef} onEnded={() => {setIsPlaying(false)}}>
                <source src={path} />
                Your browser does not support the <code>audio</code> element.
            </audio>
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
