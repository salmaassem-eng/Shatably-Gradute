import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function WorkersByCategory() {
    const { category } = useParams(); // e.g., 'plumber', 'electrician'
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                setLoading(true);
                // Fetch all workers as the backend API does not support filtering by category directly
                const response = await fetch('https://shatably.runasp.net/api/Workers');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Filter workers by the category from the URL parameter
                const filtered = data.filter(worker => 
                    worker.type && worker.type.toLowerCase() === category.toLowerCase()
                );
                setWorkers(filtered);

            } catch (err) {
                console.error("Failed to fetch workers:", err);
                setError("Failed to load workers. Please try again later.");
                toast.error("Failed to load workers.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, [category]);

    if (loading) {
        return <div className="text-center mt-20 text-xl">Loading workers...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
    }

    if (workers.length === 0) {
        return <div className="text-center mt-20 text-xl">No workers found for {category} services.</div>;
    }

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
            <div className="max-w-7xl mx-auto py-12">
                <h1 className="text-3xl font-bold mb-8 text-center text-[#16404D]">{category.charAt(0).toUpperCase() + category.slice(1)} Workers</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
                    {workers.map(worker => (
                        <div key={worker.workerId} className="bg-white rounded-[25px] shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-6">
                            <img 
                                src={worker.profilePhotoUrl || 'https://via.placeholder.com/100?text=Worker'}
                                alt={worker.fullName}
                                className="w-24 h-24 object-cover rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center">{worker.fullName}</h3>
                            <p className="text-gray-600 text-sm mb-2">{worker.experienceDisplay || `Experience: ${worker.experience} years`}</p>
                            {worker.price && <p className="text-lg font-semibold text-[#16404D] mb-4">Rate: {worker.price} EGP/Hour</p>}
                            <div className="flex items-center mb-4">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg 
                                        key={i} 
                                        className={`w-5 h-5`}
                                       viewBox="0 0 20 20"
                                    >
                                        <path 
                                          fill={i < Math.floor(worker.ratingReview.rating) ? '#DDA853' : '#E5E7EB'}

                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-gray-600 text-sm">({worker.ratingReview.rating || 0})</span>
                            </div>
                            <Link 
                                to={`/worker-item-details/${worker.workerId}`} 
                                className="mt-auto px-6 py-2 bg-[#DDA853] text-white rounded-[25px] hover:bg-[#DDA853]/90 text-sm font-medium"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 