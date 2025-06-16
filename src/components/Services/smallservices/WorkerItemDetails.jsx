import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewsSection from '../ReviewsSection';
import HammerLoading from '../../Shared/HammerLoading';

export default function WorkerItemDetails() {
    const { workerId } = useParams();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Static ratings for demonstration - you can modify these values
    const staticRatings = {
        // Format: workerId: rating (1-5)
        // Example: "worker1": 4,
        // Add more worker IDs and their ratings as needed
    };

    // Helper function to get rating for a worker
    const getWorkerRating = (workerId) => {
        // If you have a static rating for this worker, return it
        if (staticRatings[workerId]) {
            return staticRatings[workerId];
        }
        // Otherwise return a default rating (you can change this default value)
        return 4.3; // Default rating of 4 stars
    };

    useEffect(() => {
        const fetchWorkerDetails = async () => {
            try {
                const response = await fetch(`https://shatably.runasp.net/api/Workers/${workerId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setWorker(data);
            } catch (err) {
                console.error("Failed to fetch worker details:", err);
                setError("Failed to load worker details. Please try again later.");
                toast.error("Failed to load worker details.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkerDetails();
    }, [workerId]);

    if (loading) {
        return <HammerLoading />;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
    }

    if (!worker) {
        return <div className="text-center mt-20 text-xl">Worker not found.</div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 mb-[100px] mt-[5rem]">
            <Link 
                to="/services" 
                className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-[#16404D] bg-gray-100 rounded-md hover:bg-gray-200"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </Link>
            <div className="flex flex-col m-auto relative w-full max-w-[45rem] rounded-[25px] h-full bg-[#F8F8F8]">
                {/* Hero Section */}
                <div
                    className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center rounded-[25px] flex items-end justify-start p-4 sm:p-6"
                    style={{ backgroundImage: `url(${worker.profilePhotoUrl || 'https://via.placeholder.com/600x400?text=Worker+Profile'})` }}
                >
                    {/* Overlay to darken image for text readability */}
                    <div className="absolute inset-0 bg-black opacity-50 rounded-[25px]"></div>

                    {/* Worker Info Overlay */}
                    <div className="relative z-10 text-white pb-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-white">{worker.fullName}</h1>
                        <p className="text-base sm:text-lg font-medium opacity-80 text-white">{worker.type}</p>
                        {worker.price && <div className="flex items-baseline">
                            <p className="font-bold mt-2 text-[#DDA853]">{worker.price} EGP </p>
                            <p className="text-white ml-2 opacity-80">/ Hour</p>
                        </div>}
                    </div>

                    {/* Experience and Rating Boxes */}
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-4 z-20">
                        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 flex flex-col items-center justify-center border border-gray-200 w-24 sm:w-32 h-20 sm:h-24 text-center">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#16404D] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.282-8.452-3.527m16.904 0A23.931 23.931 0 0012 9c-3.183 0-6.22 1.282-8.452 3.527m16.904 0a3.527 3.527 0 01-4.995 0L12 7.005l-4.453 4.453a3.527 3.527 0 01-4.995 0m16.904 0a3.527 3.527 0 000-4.995L12 2.005l-4.453 4.453a3.527 3.527 0 00-4.995 0"></path>
                            </svg>
                            <span className="text-lg sm:text-xl font-bold text-[#16404D]">{worker.experienceDisplay || `${worker.experience} Years`}</span>
                            <span className="text-xs opacity-80">Experience</span>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 flex flex-col items-center justify-center border border-gray-200 w-24 sm:w-32 h-20 sm:h-24 text-center">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#DDA853] mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-lg sm:text-xl font-bold text-[#16404D]">{getWorkerRating(workerId)}</span>
                            <span className="text-xs opacity-80">Rating</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="relative bg-white rounded-t-[5px] rounded-b-[25px] shadow-lg -mt-8 pt-16 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 z-0">
                    {/* About Section */}
                    <div className="my-6 sm:my-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About</h2>
                        <p className="leading-relaxed text-sm sm:text-base">
                            {worker.about || "No description available."}
                        </p>
                    </div>

                    {/* Feedback and reviews Section */}
                    <ReviewsSection
                        reviews={worker.ratingReview}
                        averageRating={getWorkerRating(workerId)}
                        reviewCount={worker.ratingReview.length}
                    />
                    <div className="flex flex-col justify-center mt-6 sm:mt-8">
                        <Link to={`/Booking/worker/${workerId}`} className="bg-[#16404D] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#16404D]/90 transition-colors duration-200 text-base sm:text-lg text-center">
                            Hire Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 