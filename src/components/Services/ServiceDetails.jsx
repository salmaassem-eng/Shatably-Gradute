import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ServiceFeatures from './ServiceFeatures';

export default function ServiceDetails() {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await fetch(`https://shatably.runasp.net/api/Services/${serviceId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setService(data);
            } catch (err) {
                console.error("Failed to fetch service details:", err);
                setError("Failed to load service details. Please try again later.");
                toast.error("Failed to load service details.");
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();
    }, [serviceId]);

    if (loading) {
        return <div className="text-center mt-20 text-xl">Loading service details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
    }

    if (!service) {
        return <div className="text-center mt-20 text-xl">Service not found.</div>;
    }
    console.log('Service averageRating:', service.averageRating);
    return (
        <div className="sm:px-6 lg:px-8 mb-[100px] mt-[3rem]">
            <Link
                to="/services"
                className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-[#16404D] bg-gray-100 rounded-md hover:bg-gray-200"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>

            </Link>
            <div className="max-w-4xl mx-auto py-12 bg-white rounded-[25px] shadow-md p-8">
                <h1 className="text-3xl font-bold mb-4 text-[#16404D]">{service.name}</h1>
                {service.imageUrl && (
                    <img src={service.imageUrl} alt={service.name} className="w-full h-72 object-cover object-top rounded-md mb-6" />
                )}
                <p className="text-gray-700 mb-4">{service.details}</p>

                <ServiceFeatures service={service} />

                {service.averageRating !== undefined && (
                    <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                key={i}
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                                    fill={i < Math.floor(service.averageRating) ? '#DDA853' : '#E5E7EB'}
                                />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600 text-sm">({service.reviewCount || 0} reviews)</span>
                    </div>
                )}

                {service.price &&
                    <div className="flex items-baseline">
                        <p className="text-lg font-semibold mb-2">Price: {service.price} EGP</p> 
                        <p className="opacity-60 ml-2">Per Hour</p>
                    </div>
                }
                <div className='flex flex-col justify-center '>
                    <button onClick={() => toast.info("Booking functionality coming soon!")} className="mt-2 px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#DDA853]">Book Now</button>
                </div>
                </div>
        </div>
    );
} 