import React from 'react';

const ServiceFeatures = ({ service }) => {
    if (!service || !service.name) {
        return null; // Or a loading/placeholder if needed
    }

    return (
        <>
            {service.name === 'AC Installation' && (
                <div className="flex items-center text-[#16404D] mb-4">
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 21v-7m.001-7h.001M19 10H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2z"></path>
                        </svg>
                        <span className="text-gray-600 font-medium">Install</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span className="text-gray-600 font-medium">Repair</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12c0 2.21.815 4.206 2.189 5.766M18 19v-5h-.582m-15.356 2A8.001 8.001 0 0120 12c0-2.21-.815-4.206-2.189-5.766"></path>
                        </svg>
                        <span className="text-gray-600 font-medium">Renew</span>
                    </div>
                </div>
            )}

            {service.name === 'windows & doors' && (
                <div className="flex items-center text-[#16404D] mb-4">
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-gray-600 font-medium">Quick fixes</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm0-11V9a2 2 0 012-2h4a2 2 0 012 2v2M9 10h.01M15 10h.01"></path></svg>
                        <span className="text-gray-600 font-medium">Secure locks</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4m-5 9h2m-2 2h2M12 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v7m4 0h4a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v7m4 0h4m-4 0v4m0-4h4"></path></svg>
                        <span className="text-gray-600 font-medium">Draft-free living</span>
                    </div>
                </div>
            )}

            {service.name === 'Pest control' && (
                <div className="flex items-center text-[#16404D] mb-4">
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c0 2.893 1.144 5.766 3.237 7.962L12 22.955l5.819-2.284a12.007 12.007 0 003.237-7.962 11.955 11.955 0 01-3.04-8.618z"></path></svg>
                        <span className="text-gray-600 font-medium">Bug control</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.657-1.5 3-3 3-1.657 0-3-1.343-3-3s1.5-3 3-3 3 1.343 3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 11c0 1.657-1.5 3-3 3-1.657 0-3-1.343-3-3s1.5-3 3-3 3 1.343 3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11c0 1.657-1.5 3-3 3-1.657 0-3-1.343-3-3s1.5-3 3-3 3 1.343 3 3zM4 14c0 1.657-1.5 3-3 3-1.657 0-3-1.343-3-3s1.5-3 3-3 3 1.343 3 3z"></path></svg>
                        <span className="text-gray-600 font-medium">Mouse removal</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253m9 0c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-9 0V3s1.5-1 3-1 3 1 3 1v2.253M9 10c0 1.657-1.5 3-3 3s-3-1.343-3-3 1.5-3 3-3 3 1.343 3 3zm12 0c0 1.657-1.5 3-3 3s-3-1.343-3-3 1.5-3 3-3 3 1.343 3 3zm-9 0v10c0 1.657-1.5 3-3 3s-3-1.343-3-3V10m9 0v10c0 1.657-1.5 3-3 3s-3-1.343-3-3V10"></path></svg>
                        <span className="text-gray-600 font-medium">Green methods</span>
                    </div>
                </div>
            )}

            {service.name === 'water purifier' && (
                <div className="flex items-center text-[#16404D] mb-4">
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 013 0v6m-3 2.5h-3a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v7.5m-3 2.5h-3a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v7.5"></path></svg>
                        <span className="text-gray-600 font-medium">Clean water</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-gray-600 font-medium">Fast setup</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4M4 19h4m5-16v4m-2-2h4m5-16v4m-2-2h4M9 20h6m-2 4h-2M12 3v1m0 4v1m0 8v1m0 4v1M17 14h1m-1 4h1M4 14h1m-1 4h1M7 4h1M7 16h1M16 4h1M16 16h1"></path></svg>
                        <span className="text-gray-600 font-medium">Green solutions</span>
                    </div>
                </div>
            )}

            {service.name === 'Surveillance Cameras' && (
                <div className="flex items-center text-[#16404D] mb-4">
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12s2.001 4 10 4 10-4 10-4-2.001-4-10-4-10 4-10 4z"></path></svg>
                        <span className="text-gray-600 font-medium">Real-time alerts</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center mr-4">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m0 0l-9 9m9-9h8.586a2 2 0 011.414.586l2.828 2.828a2 2 0 01.586 1.414V17a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 002-2z"></path></svg>
                        <span className="text-gray-600 font-medium">Remote access</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c0 2.893 1.144 5.766 3.237 7.962L12 22.955l5.819-2.284a12.007 12.007 0 003.237-7.962 11.955 11.955 0 01-3.04-8.618z"></path></svg>
                        <span className="text-gray-600 font-medium">Smart security</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServiceFeatures; 