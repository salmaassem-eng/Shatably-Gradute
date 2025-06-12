import React from 'react';
import { Link } from 'react-router-dom';

// Import your images here. Replace these placeholder paths with your actual asset paths.
import electricianImage from '../../../assets/electricianservice.svg'; 
import carpentryImage from '../../../assets/carpenter.jpg';
import painterImage from '../../../assets/painting.svg';
import plumberImage from '../../../assets/plumbing.svg';
import cleaningImage from '../../../assets/cleaning.svg';

const smallServiceData = [
    {
        name: 'Electrician',
        category: 'electrician',
        description: 'Expert electrical repair and installation services.',
        image: electricianImage,
    },
    {
        name: 'Carpentry',
        category: 'carpentry',
        description: 'Skilled carpentry for furniture repair and custom woodwork.',
        image: carpentryImage,
    },
    {
        name: 'Painter',
        category: 'painting',
        description: 'Professional painting services for homes and offices.',
        image: painterImage,
    },
    {
        name: 'Plumber',
        category: 'plumbing',
        description: 'Reliable plumbing solutions for leaks, repairs, and installations.',
        image: plumberImage,
    },
    {
        name: 'Cleaning',
        category: 'cleaning',
        description: 'Thorough cleaning services for sparkling clean spaces.',
        image: cleaningImage,
    },
];

export default function SmallServiceCards() {
    return (
        <div className="my-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#16404D]">Small Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center gap-[1rem]">
                {smallServiceData.map((service) => (
                    <div 
                        key={service.category} 
                        className="bg-white rounded-[25px] shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center w-full max-w-[250px] text-center"
                    >
                        <img 
                            src={service.image}
                            alt={service.name}
                            className="w-full h-48 object-cover object-top rounded-t-[25px]"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <Link 
                                to={`/workers-by-category/${service.category}`} 
                                className="mt-auto px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#16404D]/90 hover:text-white text-sm font-medium"
                            >
                                View Workers
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 