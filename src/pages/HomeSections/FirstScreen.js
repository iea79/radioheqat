import React, { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from '../../components/Image';
import HomePlayer from './HomePlayer';

import img0 from '../../assets/img/image0.png';
import img0wp from '../../assets/img/image0.webp';
import layer1 from '../../assets/img/layer-1.png';
import layer1wp from '../../assets/img/layer-1.webp';
import layer2 from '../../assets/img/layer-2.png';
import layer2wp from '../../assets/img/layer-2.webp';
import layer3 from '../../assets/img/layer-3.png';
import layer3wp from '../../assets/img/layer-3.webp';
import ararat from '../../assets/img/ararat.png';
import araratwp from '../../assets/img/ararat.webp';
import mount from '../../assets/img/mountain.png';
import mountwp from '../../assets/img/mountain.webp';
import sun from '../../assets/img/first-sun.png';
import sunwp from '../../assets/img/first-sun.webp';
// Mobile
import fBgMob from '../../assets/img/f-screen-mob.png';

import jarPtica from '../../assets/json/jar-ptica.json';
import homeBird from '../../assets/json/first-bird.json';
import homeLeaves from '../../assets/json/first-leaves.json';
import homeFlower from '../../assets/json/first-flower.json';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const HomeFirstScreen = (props) => {
    // console.log(props);
    const { first_screen_title } = props.props;
    const firstScreen = useRef();
    const firstbg0 = useRef();
    const layerImg1 = useRef();
    const layerImg2 = useRef();
    const layerImg3 = useRef();
    const layerImg4 = useRef();
    const layerImg5 = useRef();
    const layerJarPtica = useRef();
    const layerFlower = useRef();
    const isMobile = window.screen.width < 768;

    const setGsapOptions = (wrapper) => {
        return {trigger: wrapper,
        start: 'top 0',
        end: 'bottom 0',
        scrub: true}
    }

    useLayoutEffect(() => {
        if (!isMobile) {
            gsap.to(firstbg0.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -250,
            });
            gsap.to(layerJarPtica.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -150,
                // rotation: 360
            });
            gsap.to(layerImg1.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -150,
            });
            gsap.to(layerFlower.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -200,
            });
            gsap.to(layerImg2.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -200,
            });
            gsap.to(layerImg3.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -100,
            });
            gsap.to(layerImg4.current, {
                scrollTrigger: setGsapOptions(firstScreen.current),
                y: -50,
            });
        }
    }, [isMobile])


    return (
        <section className="firstScreen" ref={ firstScreen }>
            <div className="container">
                <div className="firstScreen__content">
                    <h1 className="homePage__title">{ first_screen_title }</h1>
                    <div className="firstScreen__player">
                        <HomePlayer />
                    </div>
                </div>
            </div>
            {
                isMobile ?
                <div className="firstScreen__bg"><img src={fBgMob} alt=""/></div>
                : <div className="firstScreen__bg"><Image
                    src={sun}
                    webp={sunwp}
                    className="layer6"
                    />
                <div ref={ layerImg5 }>
                    <Image
                        src={mount}
                        webp={mountwp}
                        className="layer5"
                        />
                </div>
                <div ref={ layerImg4 }>
                    <Image
                        src={ararat}
                        webp={araratwp}
                        className="layer4"
                        />
                </div>
                <Lottie className="anim anim1" animationData={ homeBird } />
                <Lottie className="anim anim2" animationData={ homeLeaves } />
                <div ref={ layerImg3 }>
                    <Image
                        src={layer3}
                        webp={layer3wp}
                        className="layer3"
                        />
                </div>
                <div ref={ layerImg2 }>
                    <Image
                        src={layer2}
                        webp={layer2wp}
                        className="layer2"
                        />
                </div>
                <div className="anim anim3" ref={ layerFlower }>
                    <Lottie animationData={ homeFlower } />
                </div>
                <div ref={ layerImg1 }>
                    <Image
                        src={layer1}
                        webp={layer1wp}
                        className="layer1"
                        />
                </div>
                <div className="anim anim4" ref={ layerJarPtica }>
                    <Lottie animationData={ jarPtica } />
                </div>
                <div ref={ firstbg0 }>
                    <Image
                        src={img0}
                        webp={img0wp}
                        className="layer0"
                        />
                </div></div>
            }
        </section>
    )
}

export default HomeFirstScreen;
