import "./herosection.css";
import img3d_1 from '../../../assets/tv.png';
import img3d_2 from '../../../assets/sofa1.png';
import img3d_3 from '../../../assets/sofa3.png';
import display from '../../../assets/display.mp4';
import { useRef, useState } from "react";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [isHover, setIsHover] = useState(false);
    const [activeImage, setActiveImage] = useState(1);

    const images = {
        1: img3d_1,
        2: img3d_2,
        3: img3d_3
    };

    function handleMouseEnter() {
        setIsHover(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    }

    function handleMouseLeave() {
        setIsHover(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
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
                    <div className={`display ${isHover ? 'expanded' : ''}`}>
                        <video src={display} ref={videoRef} muted loop playsInline />
                        <button 
                            className="enter-button"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Enter
                        </button>
                    </div>
                </div>
                <div className="image-container"></div>
                    <img 
                        src={images[activeImage]} 
                        alt="3D Model" 
                        className="hero-image rotating" 
                    />
            </div>
        </section>
    );
}
