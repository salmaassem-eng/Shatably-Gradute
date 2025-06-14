import React from 'react';
import chatbot from '../../assets/chatbot.svg';
import generation from '../../assets/generation.svg';
import { useNavigate ,Link } from 'react-router-dom';

const AI = () => {
    const navigate = useNavigate();

    const handleTryItClickShatably = () => {
        navigate('/ai-chat');
    };

    const handleTryItClickHomeVision = () => {
        navigate('/home-vision');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E4E4E4] p-4">
            <div className="w-full flex items-center justify-between py-4 relative">
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium bg-[#E4E4E4] text-[#16404D] rounded-md hover:bg-[#16404D]/90 hover:text-white  transition duration-300"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </Link>
                <h1 className="text-4xl font-bold text-center text-gray-800 absolute left-1/2 -translate-x-1/2">Your Smart Home Assistant is Here</h1>
            </div>
            <p className="text-[20px] text-center opacity-50 mb-10">Let AI help you plan your dream space—chat instantly with our smart assistant or generate realistic photos of your home <br /> ideas before you book any service. Fast, easy, and made just for you.</p>
            <div className="flex flex-wrap justify-center gap-8 mt-[70px]">
                <div className=" rounded-[25px] shadow-lg overflow-hidden w-[465px] flex flex-col">
                    <div className="bg-[#E0E0E0] flex justify-center items-center ">
                        <img src={chatbot} alt="Shatably Assistant" className="w-full h-64 object-cover" />
                    </div>
                    <div className=" bg-[#C6C6C6] p-[22px] flex flex-col items-center -mt-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Shatably Assistant 🤖</h2>
                        <p className="text-center text-[16px] mb-5 opacity-60">Your 24/7 helper for finding the right service—fast, simple, and always here when you need it.</p>
                        <button onClick={handleTryItClickShatably} className="bg-[#16494D] text-white w-[148.4px] h-[41px]  px-6 py-2 rounded-[15px] hover:bg-[#16404D]/90 transition duration-300">Try it!</button>
                    </div>
                </div>
                <div className=" rounded-[25px] shadow-lg overflow-hidden w-[465px] flex flex-col">
                    <div className=" flex justify-center items-center">
                        <img src={generation} alt="Home Vision" className="w-full h-64 object-cover" />
                    </div>
                    <div className=" bg-[#C6C6C6] p-[22px] flex flex-col items-center -mt-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Home Vision 🏡✨</h2>
                        <p className="text-center text-[16px] mb-5 opacity-60">Generate photos of any home service idea—paint, furniture, decor & more. See it before you book!</p>
                        <button onClick={handleTryItClickHomeVision} className="bg-[#16494D] text-white w-[148.4px] h-[41px] px-6 py-2 rounded-[15px] hover:bg-[#16404D]/90 transition duration-300">Try it!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AI; 