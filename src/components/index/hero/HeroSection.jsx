import "./herosection.css";
import img3d from '../../../assets/11088893.png';
import display from '../../../assets/display.mp4';
import { useRef , useState } from "react";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [isHover , setIsHover] = useState(false);

    function handleMouseEnter() {
        setIsHover(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };
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
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                        <h1>SHATABLY</h1>
                        <p>"All your home projects—fixed, maintained, and transformed with one tap."</p>
                    </div>
                    <div className={`display ${isHover ? 'expanded' : ''}`}>
                        <video src={display} ref={videoRef} muted loop playsInline />
                        <button className="enter-button"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        >Enter</button>
                    </div>
                </div>
                <img src={img3d} alt="House" className="hero-image" />
            </div>
        </section>
    );
};