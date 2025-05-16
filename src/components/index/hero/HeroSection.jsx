import "./herosection.css";
import img3d from '../../../assets/11088893.png';
import displayimg from '../../../assets/display-img.png';

export default function HeroSection() {
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
                        <p>shatably description.</p>
                    </div>
                    <div className="display">
                        <img src={displayimg} />
                        <button className="enter-button">Enter</button>
                    </div>
                </div>
                <img src={img3d} alt="House" className="hero-image" />
            </div>
        </section>
    );
};