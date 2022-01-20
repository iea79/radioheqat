import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images
import img1 from '../../assets/img/people-layer-1.png';
import img2 from '../../assets/img/people-layer-2.png';
import img3 from '../../assets/img/people-layer-3.png';

// JSON Animations
// import sectionAnim from '../../assets/json/unicorn.json';
import sectionAnim from '../../assets/json/people-woolf.json';
import sectionAnim2 from '../../assets/json/people-man.json';
import sectionAnim3 from '../../assets/json/people-bird.json';
import sectionAnim4 from '../../assets/json/five-screen-bird.json';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const FiveScreen = (prop) => {
    const { five_screen_title, five_screen_link } = prop.props;
    const sectionPeople = useRef();
    const pelayer1 = useRef();
    const pelayer2 = useRef();
    const pelayer3 = useRef();
    const pelayerWoolf = useRef();
    const pelayerMan = useRef();
    const pelayerBird = useRef();
    const pelayerBirds = useRef();
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
        if (!isMobile)  {
            gsap.to(pelayer1.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -150,
            });
            gsap.to(pelayerWoolf.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -150,
            });
            gsap.to(pelayer2.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -100,
            });
            gsap.to(pelayerMan.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -100,
            });
            gsap.to(pelayerBird.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -100,
            });
            gsap.to(pelayer3.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -50,
            });
            gsap.to(pelayerBirds.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -10,
            });
        }
    }, []);

    return (
        <section className="fiveScreen section" ref={ sectionPeople }>
            <div className="container">
                <div className="fiveScreen__content">
                    <h2 className="section__title section__title_center">{ five_screen_title }</h2>
                    <div className="section__link">
                        <Link to={five_screen_link}>Լսեք</Link>
                    </div>
                </div>
            </div>
            {
                !isMobile ?
                <div className="fiveScreen__bg">
                    <div className="layer3" ref={ pelayer3 }>
                        <img src={ img3 } alt=""/>
                    </div>
                    <div className="layer2" ref={ pelayer2 }>
                        <img src={ img2 } alt=""/>
                    </div>
                    <div className="layer1" ref={ pelayer1 }>
                        <img src={ img1 } alt=""/>
                    </div>
                    <div className="layerWoolf" ref={ pelayerWoolf }>
                        <Lottie animationData={ sectionAnim } />
                    </div>
                    <div className="layerMan" ref={ pelayerMan }>
                        <Lottie animationData={ sectionAnim2 } />
                    </div>
                    <div className="layerBirds" ref={ pelayerBirds }>
                        <Lottie animationData={ sectionAnim3 } />
                    </div>
                    <div className="layerBird" ref={ pelayerBird }>
                        <Lottie animationData={ sectionAnim4 } />
                    </div>
                </div>
                : ''
            }
        </section>
    )
}

export default FiveScreen;
