import React, { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parse from 'html-react-parser';

import fly from '../../assets/json/fly-anim.json';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const SecondScreen = (prop) => {
    const { second_screen_title, second_screen_stream } = prop.props;
    const flyRef = useRef();
    const section = useRef();
    const isMobile = window.screen.width < 768;

    const setGsapOptions = (wrapper) => {
        return {
            trigger: wrapper,
            start: '-100%',
            end: '50%',
            onEnter: () => flyRef.current.play(),
            onEnterBack: () => flyRef.current.stop(),
            onLeaveBack: () => flyRef.current.play(),
            onLeave: () => flyRef.current.stop(),
            // markers: true
            // scrub: true
        }
    }

    useLayoutEffect(() => {
        if (!isMobile) {
            // three screen
            gsap.to(section.current, {
                scrollTrigger: setGsapOptions(section.current)
            });
        }
    }, [isMobile]);

    return (
        <section className="secondScreen section" ref={ section }>
            {
                !isMobile ?
                <div className="secondScreen__bg">
                    <Lottie animationData={ fly } lottieRef={flyRef} loop={false} autoplay={false} />
                </div>
                : ''
            }
            <div className="container">
                <div className="secondScreen__content">
                    <h2 className="section__title">{ second_screen_title }</h2>
                    <div className="section__sub">{ parse( second_screen_stream ) }</div>
                </div>
            </div>
        </section>
    )
}

export default SecondScreen;
