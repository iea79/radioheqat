import React, { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parse from 'html-react-parser';

// Images
import star0 from '../../assets/img/Sky_top_stars.svg';
import star1 from '../../assets/img/Sky_max_stars.svg';
import star2 from '../../assets/img/Sky_min_stars.svg';
import img1 from '../../assets/img/unicorn-layer-1.png';
import img2 from '../../assets/img/unicorn-layer-2.png';
import img3 from '../../assets/img/unicorn-layer-3.png';
import img4 from '../../assets/img/unicorn-layer-4.png';
import img5 from '../../assets/img/unicorn-layer-5.png';

// JSON Animations
import unicornAnim from '../../assets/json/unicorn.json';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const ThreeScreen = (props) => {
    // console.log(props.props);
    const {three_screen_title, three_screen_stream } = props.props;
    const section = useRef();
    const layer0 = useRef();
    const layer1 = useRef();
    const layer2 = useRef();
    const layer3 = useRef();
    const layer4 = useRef();
    const layer5 = useRef();
    const layerUnicorn = useRef();
    const isMobile = window.screen.width < 768;

    const setGsapOptions = (wrapper) => {
        return {trigger: wrapper,
        start: 'top 0',
        end: 'bottom 0',
        scrub: true}
    }

    useLayoutEffect(() => {
        if (!isMobile) {
            // three screen
            gsap.to(layer1.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -160,
            });
            gsap.to(layerUnicorn.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -150,
            });
            gsap.to(layer2.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -130,
            });
            gsap.to(layer3.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -100,
            });
            gsap.to(layer4.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -80,
            });
            gsap.to(layer5.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -50,
            });
            gsap.to(layer0.current, {
                scrollTrigger: setGsapOptions(section.current),
                y: -20,
            });
        }
    }, [isMobile]);

    return (

        <section className="threeScreen section" ref={ section }>
            {
                !isMobile ?
                <div className="threeScreen__bg">
                    <div className="layer0" ref={ layer0 } >
                        <img src={ star0 } alt=""/>
                        <img src={ star1 } alt=""/>
                        <img src={ star2 } alt=""/>
                    </div>
                    <img src={ img5 } className="layer5" ref={ layer5 } alt=""/>
                    <img src={ img4 } className="layer4" ref={ layer4 } alt=""/>
                    <img src={ img3 } className="layer3" ref={ layer3 } alt=""/>
                    <img src={ img2 } className="layer2" ref={ layer2 } alt=""/>
                    <div className="layer1" ref={ layer1 }>
                        <img src={ img1 } alt=""/>
                    </div>
                    <div className="layerUnicorn" ref={ layerUnicorn }>
                        <Lottie animationData={ unicornAnim } />
                    </div>
                </div>
                : ''
            }
            <div className="container">
                <div className="threeScreen__content">
                    <h2 className="section__title">{ three_screen_title }</h2>
                    <div className="section__sub">{ parse(three_screen_stream) }</div>
                </div>
            </div>
        </section>

    )
}

export default ThreeScreen;
