import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const HomeVision = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateImage = async () => {
        if (prompt.trim() === '') {
            alert('Please enter a description to generate an image.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://shatablyai.up.railway.app/image/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();

            const imageFormat = data.format || "png";
            const base64Image = `data:image/${imageFormat};base64,${data.image_data}`;
            setImageUrl(base64Image);

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleGenerateImage();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard!');
    };

    const handleShare = () => {
        // Implement share functionality (e.g., using Web Share API or custom sharing logic)
        alert('Share functionality not yet implemented.');
    };

    const handleRegenerate = () => {
        setError(null);
        setLoading(true);
        handleGenerateImage();
    };

    return (

        <div className="flex flex-col items-center justify-around min-h-screen bg-[#0A252E] text-white p-4">
            <div className="w-full flex items-center justify-between py-4 relative">
                <Link
                    to="/ai"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#ccc] border-[#ccc] rounded-md hover:bg-[#124353] hover:text-[#ccc]"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </Link>
                <h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2">Home Vision ✨</h1>
            </div>
            <div className="flex flex-col justify-center items-center border-4 border-[#124353] rounded-[25px] overflow-hidden my-8">
                {loading && <div className="flex justify-center items-center w-[744px] h-[419px]"><p className="text-xl">Generating your vision...</p></div>}
                {error && <div className="flex justify-center items-center w-[744px] h-[419px]"><p className="text-xl text-red-500">Error: {error}</p></div>}
                {imageUrl && !loading && !error ? (
                    <img src={imageUrl} alt="Generated Vision" className="max-w-full h-auto object-contain" />
                ) : (!loading && !error && (
                    <div className="flex justify-center items-center bg-gradient-to-t from-[#0A252E] to-[#113B49] w-[744px] h-[419px] text-center">
                    </div>
                ))}
            </div>
            {imageUrl && !loading && !error && (
                <div className="flex space-x-4 mb-8 justify-start w-[524px]">
                    <button onClick={handleCopy} className="flex items-center text-white text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-4 3v5m-4-5h5a2 2 0 012 2v3m-4-3a2 2 0 00-2 2h2a2 2 0 002-2"></path></svg>
                        Copy
                    </button>
                    <button onClick={handleShare} className="flex items-center text-white text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.516 4.65M15.316 10.658A3 3 0 1118 12c0 .482-.114.938-.316 1.342m0-2.684l-6.516-4.65"></path></svg>
                        Share
                    </button>
                    <button onClick={handleRegenerate} className="flex items-center text-white text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12c0 2.972 1.15 5.728 3.033 7.707M20 20v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H4"></path></svg>
                        Regenerate
                    </button>
                </div>
            )}
            <div className="w-[770px] h-[145px] bg-gradient-to-t from-[#081D23] to-[#0E3441] rounded-[15px] flex justify-center">
                <div className="relative flex justify-center items-center w-[744px] h-[110px] bg-gradient-to-t from-[#0A252E] to-[#113B49] rounded-[15px] m-auto shadow-lg">
                    <input
                        type="text"
                        placeholder="Describe your dream look - like: cozy reading corner with ambient light"
                        className="bg-transparent text-xl ml-[25px] w-[744px] border-none my-auto text-white opacity-90 placeholder:text-[#089ECC75] focus:outline-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeVision; 