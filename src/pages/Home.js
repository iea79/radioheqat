import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RestService from '../services/RestService';

import { HomeFirstScreen, SecondScreen, HomeSlider, ThreeScreen, FiveScreen, SixScreen, SevenScreen } from './HomeSections';
import { setLoader } from '../actions/actions';

import './home.scss';

const restService = new RestService();


if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const Home = React.memo( () => {
    const homeSlug = 'home';
    const { loaded } = useSelector(state => state);
    const [ home, setHome ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaded) {
        }
        if (!home) {
            dispatch(setLoader(true));
            restService.getPage(homeSlug).then(json => {
                if (json.length) {
                    // console.log(json);
                    setHome(json[0]);
                    dispatch(setLoader(false));
                }
            }).catch(() => {
                dispatch(setLoader(false));
            });
        }
    }, [ loaded, dispatch, home ]);

    if (!home) return false;

    const { scf } = home;

    return (
        <div className="homePage">
            <HomeFirstScreen props={ scf.meta } />

            <SecondScreen props={ scf.meta } />

            <ThreeScreen props={ scf.meta } />

            <HomeSlider props={ scf.meta } />

            <FiveScreen props={ scf.meta } />

            <SixScreen props={ scf.meta } />

            <SevenScreen props={ scf.meta } />

        </div>
    );
} );

export default Home;
