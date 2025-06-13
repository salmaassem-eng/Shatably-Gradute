import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

export default function ContactUs() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend
        console.log('Form submitted:', formData);
        toast.success('Your message has been sent successfully!');
        setFormData({
            fullName: '',
            email: '',
            message: ''
        });
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-[#F0F0F0] mb-[100px] mt-[5rem]">
            <div className="bg-white rounded-[25px] shadow-lg p-6 w-full max-w-[900px] relative sm:p-8 md:p-10">
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-[#16404D] bg-gray-100 rounded-md hover:bg-gray-200 absolute top-4 left-4 z-10 md:top-8 md:left-8"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </Link>
                <h1 className="text-xl font-bold mb-8 text-center text-[#16404D] sm:text-2xl md:text-3xl">Contact us</h1>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className=" md:w-1/2 flex justify-center items-center">
                    <svg width="300" height="300" viewBox="0 0 104 101" fill="none" stroke="#16404D" xmlns="http://www.w3.org/2000/svg">
                        <path d="M95.4771 2.34266C98.9561 1.23696 102.235 4.51547 101.129 7.99437L74.2969 92.418C73.1467 96.036 68.3081 96.692 66.2368 93.509L50.1078 68.7288C49.1303 67.2271 49.137 65.2885 50.1248 63.7934L65.8686 39.9649C66.4466 39.0901 65.46 38.0287 64.5454 38.5413L39.5301 52.5613C38.1023 53.3616 36.3526 53.3234 34.961 52.4618L10.3188 37.2035C7.05 35.1795 7.6607 30.2534 11.3247 29.0889L95.4771 2.34266Z" stroke="#004e66" stroke-width="4" stroke-linejoin="round"/>
                        <path d="M40.3011 61.88L37.8488 64.1195M14.3548 85.5746L5.49502 93.6659M20.6831 79.7955L30.4921 70.8378M28.7177 92.2859L22.2694 98.3239M33.3236 87.9729L40.4628 81.2878M9.11402 69.7215L2.83472 75.2105M13.5992 65.8007L20.5512 59.7236" stroke="#DFB543" stroke-width="4" stroke-linecap="round"/>
                    </svg>                  
                    </div>
                    <div className="w-full md:w-1/2">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="mb-4">
                                <label htmlFor="fullName" className="sr-only">Full name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md bg-gray-50 text-gray-700 transition-all duration-200 focus:outline-none focus:border-[#DDA853] focus:ring-3 focus:ring-[#DDA853]/20 sm:px-4 sm:py-2.5 sm:pl-8 md:px-4 md:py-3 md:pl-10"
                                        required
                                    />
                                    <svg className="absolute left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 sm:left-2 sm:w-5 sm:h-5 md:left-3 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md bg-gray-50 text-gray-700 transition-all duration-200 focus:outline-none focus:border-[#DDA853] focus:ring-3 focus:ring-[#DDA853]/20 sm:px-4 sm:py-2.5 sm:pl-8 md:px-4 md:py-3 md:pl-10"
                                        required
                                    />
                                    <svg className="absolute left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 sm:left-2 sm:w-5 sm:h-5 md:left-3 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0018 4H2a2 2 0 00-.003 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="sr-only">Message</label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md bg-gray-50 text-gray-700 transition-all duration-200 resize-y focus:outline-none focus:border-[#DDA853] focus:ring-3 focus:ring-[#DDA853]/20 pt-3 sm:px-4 sm:py-2.5 sm:pl-8 sm:pt-2.5 md:px-4 md:py-3 md:pl-10 md:pt-3.5"
                                        required
                                    ></textarea>
                                    <svg className="absolute left-1.5 top-3 w-4 h-4 text-gray-400 sm:left-2 sm:top-4 sm:w-5 sm:h-5 md:left-3 md:top-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.517 12.119 2 10.582 2 9c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-1.5 bg-[#16404D] text-white rounded-[25px] font-semibold hover:bg-[#16404D]/90 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:px-4 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
                            >
                                Submit
                                <svg className="w-5 h-5" fill="none" stroke="#FFC973" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center gap-3 mt-8 tranform translate-y-14 sm:gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-[transperent] border-[#DDA853] border-2 transform hover:-translate-y-[2px] sm:w-10 sm:h-10 md:w-12 md:h-12">
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} className="w-4 h-4  sm:w-5 sm:h-5 md:w-6 md:h-6" /> 
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full  bg-[transperent] border-[#DDA853] border-2 transform hover:-translate-y-[2px] sm:w-10 sm:h-10 md:w-12 md:h-12">
                        <FontAwesomeIcon icon={["fab", "twitter"]} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full  bg-[transperent] border-[#DDA853] border-2 transform hover:-translate-y-[2px] sm:w-10 sm:h-10 md:w-12 md:h-12">
                        <FontAwesomeIcon icon={["fab", "instagram"]} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
} 