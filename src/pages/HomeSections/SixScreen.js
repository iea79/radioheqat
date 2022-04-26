import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie, { useLottie } from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images
import img1 from '../../assets/img/david-1.png';
import img2 from '../../assets/img/david-2.png';
import img3 from '../../assets/img/david-3.png';
import img4 from '../../assets/img/david-4.png';

// JSON Animations
// import sectionAnim from '../../assets/json/unicorn.json';
import sectionAnim from '../../assets/json/david.json';
import sectionAnim2 from '../../assets/json/david-bird.json';

const SectionAnim = () => {
    const options = {
        animationData: sectionAnim,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);

    return View;
};

const SectionAnim2 = () => {
    const options = {
        animationData: sectionAnim2,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);

    return View;
};

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const SixScreen = (prop) => {
    const { six_screen_title, six_screen_link } = prop.props;
    const sectionPeople = useRef();
    const pelayer1 = useRef();
    const pelayer2 = useRef();
    const pelayer3 = useRef();
    const pelayer4 = useRef();
    const pelayerDavid = useRef();
    const pelayerBird = useRef();
    const isMobile = window.screen.width < 768;

    const setGsapOptions = (wrapper) => {
        return {
            trigger: wrapper,
            start: 'top 0',
            end: 'bottom 0',
            scrub: true
        }
    }

    useLayoutEffect(() => {
        // three screen
        if (!isMobile) {
            gsap.to(pelayer1.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -150,
            });
            gsap.to(pelayerDavid.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -150,
            });
            gsap.to(pelayer2.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -100,
            });
            gsap.to(pelayer3.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -40,
            });
            gsap.to(pelayer4.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -70,
            });
            gsap.to(pelayerBird.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -10,
            });
        }
    }, [isMobile]);

    return (
        <section className="sixScreen section" ref={ sectionPeople }>
            <div className="container">
                <div className="sixScreen__content">
                    <h2 className="section__title section__title_center">{ six_screen_title }</h2>
                    <div className="section__link">
                        <Link to={ six_screen_link }>Լսեք</Link>
                    </div>
                </div>
            </div>
            {
                !isMobile ?
                <div className="sixScreen__bg">
                    <div className="layer3" ref={ pelayer3 }>
                        <img src={ img3 } alt=""/>
                    </div>
                    <div className="layer4" ref={ pelayer4 }>
                        <img src={ img4 } alt=""/>
                    </div>
                    <div className="layer2" ref={ pelayer2 }>
                        <img src={ img2 } alt=""/>
                    </div>
                    <div className="layer1" ref={ pelayer1 }>
                        <img src={ img1 } alt=""/>
                    </div>
                    <div className="layerDavid" ref={ pelayerDavid }>
                        <SectionAnim />
                    </div>
                    <div className="layerBird" ref={ pelayerBird }>
                        <SectionAnim2 />
                    </div>
                </div>
                : ''
            }
        </section>
    )
}

export default SixScreen;
