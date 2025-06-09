import "./herosection.css";
import img3d_1 from '../../../assets/tv.png';
import img3d_2 from '../../../assets/sofa1.png';
import img3d_3 from '../../../assets/sofa3.png';
import display from '../../../assets/display.mp4';
import { useRef, useState, useEffect } from "react";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [isHover, setIsHover] = useState(false);
    const [activeImage, setActiveImage] = useState(1);
    const [slideDirection, setSlideDirection] = useState("next");
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const prevImageRef = useRef(1);

    const imagesList = [
        { id: 1, src: img3d_1 },
        { id: 2, src: img3d_2 },
        { id: 3, src: img3d_3 }
    ];

    // Start auto-slide when component mounts and when activeImage changes
    useEffect(() => {
        startAutoSlide();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeImage]); // Restart timer when active image changes

    const startAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            if (!isPaused) {
                const currentIndex = imagesList.findIndex(img => img.id === activeImage);
                const nextIndex = (currentIndex + 1) % imagesList.length;
                const nextImage = imagesList[nextIndex].id;
                
                // Always set direction as "next" for auto-sliding
                setSlideDirection("next");
                prevImageRef.current = activeImage;
                setActiveImage(nextImage);
            }
        }, 3000);
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

    const determineSlideDirection = (newImage, oldImage) => {
        // For manual navigation
        if (newImage === 1 && oldImage === 3) return "next";
        if (newImage === 3 && oldImage === 1) return "prev";
        return newImage > oldImage ? "next" : "prev";
    };

    const handleImageChange = (newImage) => {
        // Only determine slide direction for manual navigation
        const direction = determineSlideDirection(newImage, activeImage);
        setSlideDirection(direction);
        prevImageRef.current = activeImage;
        setActiveImage(newImage);
    };

    const handleButtonHover = () => {
        setIsPaused(true);
    };

    const handleButtonLeave = () => {
        setIsPaused(false);
    };

    const currentImage = imagesList.find(img => img.id === activeImage)?.src || imagesList[0].src;

    return (
        <section className="hero-section">
            <div className="card-wrapper">
                <div className="hero-text">
                    <div>
                        <div className="hero-btn"
                             onMouseEnter={handleButtonHover}
                             onMouseLeave={handleButtonLeave}>
                            {imagesList.map(img => (
                                <button 
                                    key={img.id}
                                    className={activeImage === img.id ? 'active' : ''} 
                                    onClick={() => handleImageChange(img.id)}
                                >
                                    {img.id}
                                </button>
                            ))}
                        </div>
                        <h1>SHATABLY</h1>
                        <p>"All your home projects—fixed, maintained, and transformed with one tap."</p>
                    </div>

                    <div className={`display`}>
                        <video 
                            src={display} 
                            className={`${isHover ? 'expanded' : ''}`}
                            ref={videoRef} 
                            muted 
                            loop 
                            playsInline
                        />
                        <button 
                            className="enter-button"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Enter
                        </button>
                    </div>
                </div>

                <div className="image-container">
                    <img 
                        src={currentImage} 
                        alt="3D Model"
                        key={activeImage}
                        data-direction={slideDirection}
                        className="hero-image" 
                    />
                </div>
            </div>
        </section>
    );
}

