import React, { useState, useEffect, useRef } from 'react';
// import RestService from '../../services/RestService';
import { useSelector, useDispatch } from 'react-redux';
import { setLivePosition, setBookPlayed, setLiveDuration } from '../../actions/actions';
import RestService from '../../services/RestService';

import './livePlayer.scss';

const restService = new RestService();


const HomePlayer = () => {
    const dispatch = useDispatch();
    const { bookPlayed, live, livePaused, livePosition = 0, liveDuration = 0 } = useSelector(state => state);
    const { media, id } = bookPlayed;
    const [ isEnded, setIsEnded ] = useState(false);
    const audioRef = useRef(new Audio(media.audio));
    const intervalRef = useRef();
    let { duration } = audioRef.current;


    useEffect(() => {
        if (!media.audio) {
            return getNextBook();
        }

        if (live) {
            if (livePaused) {
                audioRef.current.pause();
            } else {
                playAudio();
            }
        } else {
            audioRef.current.pause();
        }
    }, [ live, livePaused, media.audio ]);

    useEffect(() => {
        if (isEnded) {
            getNextBook();
        } else {
            if (!livePaused && live) {
                playAudio();
            }
        }
    }, [ isEnded ]);

    const getNextBook = () => {
        restService.getBooks('?orderby=rand').then(json => {
            console.log(json[0]);
            dispatch(setBookPlayed(json[0]));
            dispatch(setLivePosition(0));
            setIsEnded(false);
            if (live && !livePaused) {
                playAudio();
            }
        }).catch(() => {
            setIsEnded(true);
        })
    }

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            dispatch(setLivePosition(audioRef.current.currentTime));
            dispatch(setLiveDuration(audioRef.current.duration));
            audioRef.current.onended = () => {
                setIsEnded(true);
            }
        }, [1000]);
    }

    const playAudio = () => {
        if (!media.audio) return false;

        const promise = audioRef.current.play();

        // navigator.mediaDevices.getUserMedia({audio: true, video: false})
        // .then(function(stream) {
        //     console.log(stream);
        // })
        // .catch(function(err) {
        //     console.log(err);
        //     /* обработка ошибки */
        // });

        if (!promise) {
            return getNextBook();
        }


        if (promise !== undefined) {
            audioRef.current.muted = true;
            promise.then(() => {
                audioRef.current.currentTime = livePosition;
                audioRef.current.muted = false;
                startTimer();
            }).catch(() => {
                audioRef.current.currentTime = livePosition;
                setTimeout(function () {
                    audioRef.current.play();
                    audioRef.current.muted = false;
                    startTimer();
                }, 100);
            })
        }
    }

    return (
        <div className="livePlayer" key={id}>
            <div className="livePlayer__wrap">
                <div
                    className="livePlayer__btn"
                    >
                    { !livePaused ? <i className="icon_pause"></i> : <i className="icon_play"></i> }
                </div>
            </div>
        </div>
    )
}

export default HomePlayer;
