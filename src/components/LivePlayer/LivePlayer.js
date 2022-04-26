import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLivePosition, setLiveDuration, setLiveLoader, setLive, setBookPlayed, setLiveScreen } from '../../actions/actions';
import RestService from '../../services/RestService';


import { AudioPlayerProvider, useAudioPlayer, useAudioPosition } from "react-use-audio-player"

import './livePlayer.scss';

const restService = new RestService();

const silence = process.env.PUBLIC_URL + "/250-milliseconds-of-silence.mp3";


const HomePlayer = () => {
    const dispatch = useDispatch();
    const { bookPlayed, live, livePaused, livePosition = 0 } = useSelector(state => state);
    const { media: { audio } } = bookPlayed;
    const [ isEnded, setIsEnded ] = useState(false);
    const [ canplay, setCanPlay ] = useState(false);
    const audioRef = useRef(new Audio(audio));
    // const audioContext = useRef(new AudioContext());
    const intervalRef = useRef(0);
    let { muted } = audioRef.current;

    // console.log('Live', live);
    // console.log('livePaused', livePaused);
    // console.log('Muted', muted);
    if (muted) {
        // audioRef.current.load();
    }

    useEffect(() => {
        if (live && !livePaused && !canplay) {
            dispatch(setLiveScreen(true));
        }
    }, [])

    useEffect(() => {

        if (audio && canplay) {
            dispatch(setLiveLoader(false));
            if (live && !livePaused) {
                audioRef.current.play();
                audioRef.current.muted = false;
            }
        } else {
            dispatch(setLiveLoader(true));
            audioRef.current.load();
        }

    }, [ canplay ]);

    useEffect(() => {
        console.log('Live', live);
        console.log('livePaused', livePaused);
        console.log('Muted', muted);
        console.log('Can play', canplay);
        if (live) {
            if (livePaused) {
                pauseAudio();
            } else {
                playAudio();
            }
        } else {
            pauseAudio();
        }
    }, [ live, livePaused ]);

    useEffect(() => {
        if (isEnded) {
            getNextBook();
        }
    }, [ isEnded ]);

    const getNextBook = useCallback(() => {
        console.log('getNextBook');
        audioRef.current.muted = true;
        restService.getBooks('?orderby=rand').then(json => {
            console.log(json[0]);
            setIsEnded(false);
            setCanPlay(false);
            dispatch(setBookPlayed(json[0]));
            dispatch(setLivePosition(0));
            // dispatch(setLiveDuration(0));
        }).catch(() => {
            setIsEnded(true);
        })
    }, [])

    const startTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        console.log(audioRef.current);

        intervalRef.current = setInterval(() => {
            dispatch(setLiveDuration(audioRef.current && audioRef.current.duration ? audioRef.current.duration : 0));
            dispatch(setLivePosition(audioRef.current && audioRef.current.currentTime ? audioRef.current.currentTime : 0));
        }, [1000]);
    }, [])

    const playAudio = useCallback(async () => {
        // if (canplay) {
            audioRef.current.play().then((e) => {
                console.log('connected audio');
                audioRef.current.currentTime = livePosition;
                audioRef.current.muted = false;
                audioRef.current.volume = 1;
                startTimer();
            })
            .catch((e) => {
                console.log('error connected audio', e);
                pauseAudio();
                dispatch(setLive(false));
            });
        // } else {
        //     audioRef.current.src = audio;
        //     audioRef.current.load();
        // }

    }, [])

    const pauseAudio = useCallback(() => {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
    }, [])

    return (
        <div className="livePlayer">
            {/*<iframe src={silence} allow="autoplay" className="hidden"></iframe>*/}
            <audio
                ref={audioRef}
                controls
                src={audio}
                style={{
                    display: 'none'
                }}
                autoPlay
                muted
                onPlaying={() => {
                    dispatch(setLiveLoader(false));
                    dispatch(setLiveScreen(false));
                    dispatch(setLive(true));
                }}
                onCanPlayThrough={() => {
                    dispatch(setLiveLoader(false));
                    setCanPlay(true);
                    if (live && ! livePaused) {
                        // playAudio();
                    }
                }}
                onCanPlay={() => {
                    dispatch(setLiveLoader(false));
                    setCanPlay(true);
                    if (live && ! livePaused) {
                        // playAudio();
                    }
                }}
                onEnded={() => {
                    setIsEnded(true);
                }}
                onError={(e) => {
                    dispatch(setLive(false));
                    console.log(e);
                }}
            >
                {/*<source src={audio} type="audio/mp3" />*/}
            </audio>

        </div>
    )
}

export default HomePlayer;
