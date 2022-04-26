import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { setLivePaused } from '../../actions/actions';
import Bar from '../../assets/img/audiobar1.svg';

import './Player.scss';

const AudioPlayer = (props) => {

    const dispatch = useDispatch();
    const { id, path } = props;
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loader, setLoader] = useState(false);
    let audioRef = useRef(new Audio());
    const intervalRef = useRef();
    let { duration, muted } = audioRef.current;

    // console.log(muted);
    if (muted) {
        audioRef.current.src = path;
        audioRef.current.load();
    }

    useEffect(() => {
        if (audioRef && audioRef.current) {
            if (isPlaying) {
                dispatch(setLivePaused(true));
                playAudio();

            } else {
                dispatch(setLivePaused(false));
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [ isPlaying ]);

    const playPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    const playAudio = async () => {
        setLoader(true);

        if (muted) {
            // audioRef.current.load();
            await new Promise((r) => setTimeout(r, 2000));
        }

        audioRef.current &&
        audioRef.current.play()
            .then((e) => {
                if (audioRef.current.muted) {
                    audioRef.current.muted = false;
                }
                setIsPlaying(true);
                startTimer();
                // console.log(e);
                setLoader(false);
                // audioRef.current.onPlaying = () => {setLoader(false)};
            })
            .catch((e) => {
                setIsPlaying(false);
                audioRef.current.muted = true;
                // console.log(e);
                setLoader(false);
            });
    };

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current) {
                setTrackProgress(audioRef.current.currentTime);
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
            {
                loader ? <div className="player__loader"><div className="player__loaderEl"></div></div> : ''
            }
            <audio key={id} src="" ref={audioRef} controls autoPlay muted
                onEnded={() => {setIsPlaying(false)}}
                onPause={() => {
                    setLoader(false);
                }}
            ></audio>
            {
                <div className="player__btn" onClickCapture={playPause}>
                    { isPlaying ? <i className="icon_pause"></i> : <i className="icon_play"></i> }
                </div>
            }
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
                    onClick={onScrubEnd}
                    />
            </div>
        </div>
    )
}

export default AudioPlayer;
