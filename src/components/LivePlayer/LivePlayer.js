import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLivePosition, setLiveDuration, setLiveLoader, setLive, setBookPlayed, setLiveScreen } from '../../actions/actions';
import RestService from '../../services/RestService';


import { useAudioPlayer, useAudioPosition } from "react-use-audio-player"

import './livePlayer.scss';

const restService = new RestService();

const silence = process.env.PUBLIC_URL + "/250-milliseconds-of-silence.mp3";

const HomePlayer = () => {
    const dispatch = useDispatch();
    const { bookPlayed, live, livePaused, livePosition, liveDuration } = useSelector(state => state);
    const { media: { audio } } = bookPlayed;
    // const [ isEnded, setIsEnded ] = useState(false);
    // const [ isEnded, setIsEnded ] = useState(false);
    // const audioRef = useRef(new Audio(audio));
    // const intervalRef = useRef(0);
    // let { muted } = audioRef.current;

    // console.log(useAudioPlayer());


    const player = useAudioPlayer({
        src: audio,
        format: "mp3",
        autoplay: live && !livePaused,
        onend: () => getNextBook()
    });
    const { percentComplete, seek } = useAudioPosition({ highRefreshRate: true })
    const { ready, loading, playing, duration, error } = player;

    const goToPosition = useCallback((percentage) => {
        console.log(liveDuration);
        console.log(livePosition);
        seek(liveDuration * livePosition);
        // console.log(seek());
    }, [seek]);


    useEffect(() => {
        if (loading) {
            dispatch(setLiveLoader(true));
        }
        if (ready) {
            dispatch(setLiveLoader(false));
            dispatch(setLiveDuration(duration));
            goToPosition(percentComplete);
        }
    }, [loading, ready])

    useEffect(() => {
        dispatch(setLiveScreen(true));

        if (error) {
            dispatch(setLive(false));
            dispatch(setLiveScreen(true));
        } else {
            dispatch(setLiveScreen(false));
        }
    }, [error])

    useEffect(() => {
        if (playing) {
            // console.log(percentComplete);
            dispatch(setLivePosition(percentComplete));
        }
    }, [percentComplete])

    useEffect(() => {
        console.log(audio);
        console.log(player);
        console.log(percentComplete, duration);
        console.log(duration);
        if (live && ready && !playing) {
            player.play();
        }
        if (!live || livePaused) {
            player.pause();
        }
    }, [live, livePaused])

    const getNextBook = useCallback(() => {
        console.log('getNextBook');
        // audioRef.current.muted = true;
        restService.getBooks('?orderby=rand').then(json => {
            console.log(json[0]);
            // setIsEnded(false);
            // setCanPlay(false);
            dispatch(setBookPlayed(json[0]));
            dispatch(setLivePosition(0));
            // dispatch(setLiveDuration(0));
        }).catch(() => {
            // setIsEnded(true);
        })
    }, [])

    if (!ready && !loading) return <div className="livePlayer">{/*No audio to play*/}</div>
    if (loading) return <div className="livePlayer">{/*Loading audio*/}</div>

    return (
        <div className="livePlayer">{/*loaded*/}</div>
    )
}

export default HomePlayer;
