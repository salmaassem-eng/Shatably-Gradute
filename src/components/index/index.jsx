import React, { useEffect } from 'react';
import CombinedSection from './CombinedSection';
import Service from './service/Service';
import About from './values/values';
import Subscribe from './subscribe/subscribe';

const IndexPage = () => {
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Geolocation allowed:", { latitude, longitude });
                    localStorage.setItem('userLatitude', latitude);
                    localStorage.setItem('userLongitude', longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Do not store anything if denied or error
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

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
