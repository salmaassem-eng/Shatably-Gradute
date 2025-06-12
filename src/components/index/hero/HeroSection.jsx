import "./herosection.css";
import img3d_1 from '../../../assets/tv.png';
import img3d_2 from '../../../assets/sofa1.png';
import img3d_3 from '../../../assets/sofa3.png';
import display from '../../../assets/display.mp4';
import { useRef, useState } from "react";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeImage, setActiveImage] = useState(1);

    const images = {
        1: img3d_1,
        2: img3d_2,
        3: img3d_3
    };

    function togglePlayPause() {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <section className="hero-section">
            <div className="card-wrapper">
                <div className="hero-text">
                    <div>
                        <div className="hero-btn">
                            <button 
                                className={activeImage === 1 ? 'active' : ''} 
                                onClick={() => setActiveImage(1)}
                            >
                                1
                            </button>
                            <button 
                                className={`${activeImage === 2 ? 'active' : ''}`}
                                onClick={() => setActiveImage(2)}
                            >
                                2
                            </button>
                            <button 
                                className={activeImage === 3 ? 'active' : ''} 
                                onClick={() => setActiveImage(3)}
                            >
                                3
                            </button>
                        </div>
                        <h1>SHATABLY</h1>
                        <p>"All your home projects—fixed, maintained, and transformed with one tap."</p>
                    </div>
                    <div className={`display ${isPlaying ? 'expanded' : ''}`}>
                        <video src={display} ref={videoRef} muted loop playsInline />
                        <button 
                            className="play-pause-button"
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653v13.694c0 .905 1.18 1.447 1.987.951l11.21-6.822a1.08 1.08 0 000-1.902L7.237 4.702A1.08 1.08 0 005.25 5.653z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="image-container">
                    <img 
                        src={images[activeImage]} 
                        alt="3D Model" 
                        className="hero-image" 
                    />
                </div>
            </div>
        </section>
    );
}