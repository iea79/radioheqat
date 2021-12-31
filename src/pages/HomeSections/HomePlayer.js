import React, { useState, useEffect, useRef } from 'react';
import Bar from '../../assets/img/audiobar1.svg';

const HomePlayer = (props) => {
    // if (!props.book) return false;
    console.log(props.book);
    let audio;
    const { author, bookAudio } = props.book;
    console.log(bookAudio);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const audioRef = useRef(new Audio(audio));
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
    }, [ isPlaying ]);


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

    if (bookAudio && bookAudio !== "") {
        audio = process.env.PUBLIC_URL + '/audio/' + bookAudio;
        // console.log(audio);
    }

    // console.log(props);
    if (props.book) {
        return (
            <div className="player">
                <audio ref={audioRef} onEnded={() => {setIsPlaying(false)}}>
                    <source src={ audio } />
                    Your browser does not support the <code>audio</code> element.
                </audio>
                <div className="player__cover">
                </div>
                <div className="player__wrap">
                    <div className="player__btn" onClick={() => {playPause()}}>
                        { isPlaying ? <i className="icon_pause"></i> : <i className="icon_play"></i> }
                    </div>
                    <div className="player__descr">
                        <div className="player__top">Ավետիք Իսահակյան * Ապրեք</div>
                        <div className="player__author">{ author }</div>
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
            </div>
        )
    } else {
        return false;
    }
}

export default HomePlayer;
