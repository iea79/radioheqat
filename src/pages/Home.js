import React, { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HomeFirstScreen, HomeSlider } from './HomeSections';

// Images
import simg0 from '../assets/img/unicorn-layer-0.png';
import simg1 from '../assets/img/unicorn-layer-1.png';
import simg2 from '../assets/img/unicorn-layer-2.png';
import simg3 from '../assets/img/unicorn-layer-3.png';
import simg4 from '../assets/img/unicorn-layer-4.png';
import simg5 from '../assets/img/unicorn-layer-5.png';

// JSON Animations
import unicornAnim from '../assets/json/unicorn.json';
import './home.scss';

if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const Home = () => {

    const threeScreen = useRef();
    const secondbg0 = useRef();
    const secondbg1 = useRef();
    const secondbg2 = useRef();
    const secondbg3 = useRef();
    const secondbg4 = useRef();
    const secondbg5 = useRef();
    const secondbgUnicorn = useRef();

    const setGsapOptions = (wrapper) => {
        return {trigger: wrapper,
        start: 'top 0',
        end: 'bottom 0',
        scrub: true}
    }

    useLayoutEffect(() => {

        // three screen
        gsap.to(secondbg1.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -160,
        });
        gsap.to(secondbgUnicorn.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -150,
        });
        gsap.to(secondbg2.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -130,
        });
        gsap.to(secondbg3.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -100,
        });
        gsap.to(secondbg4.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -80,
        });
        gsap.to(secondbg5.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -50,
        });
        gsap.to(secondbg0.current, {
            scrollTrigger: setGsapOptions(threeScreen.current),
            y: -20,
        });
    }, []);


    return (
        <div className="homePage">
            <HomeFirstScreen />

            <section className="secondScreen section">
                <div className="container">
                    <div className="secondScreen__content">
                        <h2 className="section__title">Ռադիո Հեքիաթ</h2>
                        <div className="section__sub">նախագիծը ստեղծվել է  հազարամյակների խորքից եկող Հեքիաթի լույսը ՝ բանահյուսության գաղտնագրված իմաստությունը և խոհեմության խորհուրդը հայ մարդուն փոխանցելու համար, որպեսզի հայ մարդը շրջվի դեպի Հեքիաթը, նպաստի լույսի հաղթանակի ոգեղենացմանը և հավատա հրաշքին</div>
                    </div>
                </div>
            </section>

            <section className="threeScreen section" ref={ threeScreen }>
                <div className="threeScreen__bg">
                    <img src={ simg0 } className="layer0" ref={ secondbg0 } alt=""/>
                    <img src={ simg5 } className="layer5" ref={ secondbg5 } alt=""/>
                    <img src={ simg4 } className="layer4" ref={ secondbg4 } alt=""/>
                    <img src={ simg3 } className="layer3" ref={ secondbg3 } alt=""/>
                    <img src={ simg2 } className="layer2" ref={ secondbg2 } alt=""/>
                    <div className="layer1" ref={ secondbg1 }>
                        <img src={ simg1 } alt=""/>
                    </div>
                    <div className="layerUnicorn" ref={ secondbgUnicorn }>
                        <Lottie animationData={ unicornAnim } />
                    </div>
                </div>
                <div className="container">
                    <div className="threeScreen__content">
                        <h2 className="section__title">Րագրի կարևոր առաքելությունը</h2>
                        <div className="section__sub">Նախագծի նպատակներից է ունկնդրին հաղորդելի դարձնել բանահյուսության մեջ արտացոլված հնագույն ժամանակներից սկսած հայ ժողովրդի կյանքին, նրա աշխարհայացքին, բարոյագիտական հայացքների համակարգին, ժողովրդական փիլիսոփայությանը և գեղագիտական ընկալումներին, ինչպես նաև ձայնային հեռարձակման միջոցով ապահովել  հայերենի բարբառների պահպանումն ու փոխանցումը՝ շարունակելով  ազգի նվիրյալների՝ ասացողների և բանահավաքների գործը, որպեսզի աշխարհի բոլոր անկյուններում հայ մարդը հարազատ լեզվով ու բարբառով հեքիաթ լսելու հնարավորություն ունենա։</div>
                    </div>
                </div>
            </section>

            <HomeSlider />


        </div>
    )
}

export default Home;
