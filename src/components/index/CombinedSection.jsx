import React from 'react';
import HeroSection from './hero/HeroSection';
import Mobile from './mobile/mobile';
import './CombinedSection.css';

const CombinedSection = () => {
    return (
        <section className="combined-section">
            <HeroSection />
            <Mobile />
        </section>
    );
};

export default CombinedSection;