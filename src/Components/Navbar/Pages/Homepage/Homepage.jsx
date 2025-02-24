import React, { useRef } from 'react';
import Hero from './Hero/Hero';
import Benefits from './Benefits/Benefits';
import Testimonial from './Testimonial/Testimonial';

const Homepage = () => {
    const benefitsRef = useRef(null);

    const scrollToBenefits = () => {
        benefitsRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    };

    return (
        <>
            <Hero scrollToBenefits={scrollToBenefits} /> 
            <Benefits ref={benefitsRef} /> 
            <Testimonial />
        </>
    );
};

export default Homepage;