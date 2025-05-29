import React from 'react';
import CombinedSection from './CombinedSection';
import Service from './service/Service';
import About from './values/values';
import Subscribe from './subscribe/subscribe';

const IndexPage = () => {
  return (
    <>
    <CombinedSection/>
    <Service/>
    <About/>
    <Subscribe/>
    </>
  )
}

export default IndexPage;
