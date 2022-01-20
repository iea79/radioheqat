import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images
import img1 from '../../assets/img/autors-1.png';
import img1wp from '../../assets/img/autors-1.webp';
import img2 from '../../assets/img/autors-2.png';
import img2wp from '../../assets/img/autors-2.webp';
import img3 from '../../assets/img/autors-3.png';
import img3wp from '../../assets/img/autors-3.webp';
import img4 from '../../assets/img/autors-4.png';
import img4wp from '../../assets/img/autors-4.webp';
import img5 from '../../assets/img/autors-5.png';
import img5wp from '../../assets/img/autors-5.webp';
import img6 from '../../assets/img/autors-6.png';
import img6wp from '../../assets/img/autors-6.webp';
import img7 from '../../assets/img/autors-7.png';
import img7wp from '../../assets/img/autors-7.webp';

// JSON Animations
// import sectionAnim from '../../assets/json/unicorn.json';
import sectionAnim from '../../assets/json/authors-tiger.json';
import sectionAnim2 from '../../assets/json/authors-wooman.json';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const SevenScreen = (prop) => {
    const { seven_screen_title, seven_screen_link } = prop.props;
    const sectionPeople = useRef();
    const pelayer1 = useRef();
    const pelayer2 = useRef();
    const pelayer3 = useRef();
    const pelayer4 = useRef();
    const pelayer5 = useRef();
    const pelayer6 = useRef();
    const pelayer7 = useRef();
    const pelayerWooman = useRef();
    const pelayerTiger = useRef();
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
        if (!isMobile) {
            // three screen
            gsap.to(pelayer1.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -180,
            });
            gsap.to(pelayerWooman.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -180,
            });
            gsap.to(pelayer2.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -130,
            });
            gsap.to(pelayerTiger.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -130,
            });
            gsap.to(pelayer3.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -100,
            });
            gsap.to(pelayer4.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -80,
            });
            gsap.to(pelayer5.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -80,
            });
            gsap.to(pelayer6.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -60,
            });
            gsap.to(pelayer7.current, {
                scrollTrigger: setGsapOptions(sectionPeople.current),
                y: -30,
            });
        }
    }, [isMobile]);

    return (
        <section className="sevenScreen section" ref={ sectionPeople }>
            <div className="container">
                <div className="sevenScreen__content">
                    <h2 className="section__title section__title_center">{ seven_screen_title }</h2>
                    <div className="section__link">
                        <Link to={ seven_screen_link }>Լսեք</Link>
                    </div>
                </div>
            </div>
            {
                !isMobile ?
                <div className="sevenScreen__bg">
                    <div className="layer7" ref={ pelayer7 }>
                        <picture>
                            <source srcSet={ img7wp }  type="image/webp" />
                            <img src={ img7 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer6" ref={ pelayer6 }>
                        <picture>
                            <source srcSet={ img6wp }  type="image/webp" />
                            <img src={ img6 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer5" ref={ pelayer5 }>
                        <picture>
                            <source srcSet={ img5wp }  type="image/webp" />
                            <img src={ img5 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer4" ref={ pelayer4 }>
                        <picture>
                            <source srcSet={ img4wp }  type="image/webp" />
                            <img src={ img4 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer3" ref={ pelayer3 }>
                        <picture>
                            <source srcSet={ img3wp }  type="image/webp" />
                            <img src={ img3 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer2" ref={ pelayer2 }>
                        <picture>
                            <source srcSet={ img2wp }  type="image/webp" />
                            <img src={ img2 } alt=""/>
                        </picture>
                    </div>
                    <div className="layer1" ref={ pelayer1 }>
                        <picture>
                            <source srcSet={ img1wp }  type="image/webp" />
                            <img src={ img1 } alt=""/>
                        </picture>
                    </div>
                    <div className="layerTiger" ref={ pelayerTiger }>
                        <Lottie animationData={ sectionAnim } />
                    </div>
                    <div className="layerWooman" ref={ pelayerWooman }>
                        <Lottie animationData={ sectionAnim2 } />
                    </div>
                </div>
                : ''
            }
        </section>
    )
}

export default SevenScreen;
