import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function WorkerItemDetails() {
    const { workerId } = useParams();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <div className="text-center mt-20 text-xl">Loading worker details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
    }

    if (!worker) {
        return <div className="text-center mt-20 text-xl">Worker not found.</div>;
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
        <div className="flex flex-col m-auto relative w-[45rem] rounded-[25px] h-full bg-[#F8F8F8]">
            {/* Hero Section */}
            <div
                className="relative h-[60vh] bg-cover bg-center rounded-[25px] flex items-end justify-start p-6"
                style={{ backgroundImage: `url(${worker.profilePhotoUrl || 'https://via.placeholder.com/600x400?text=Worker+Profile'})` }}
            >
                {/* Overlay to darken image for text readability */}
                <div className="absolute inset-0 bg-black opacity-40 rounded-[25px]"></div>

                {/* Worker Info Overlay */}
                <div className="relative z-10 text-white pb-4">
                    <h1 className="text-4xl font-bold mb-1 text-white">{worker.fullName}</h1>
                    <p className="text-lg font-medium opacity-80 text-white">{worker.type}</p>
                    {worker.price && <div className="flex items-baseline">
                        <p className="font-bold mt-2 text-[#DDA853]">{worker.price} EGP </p>
                        <p className="text-white ml-2 opacity-80">/ Hour</p>
                    </div>}
                </div>

                {/* Experience and Rating Boxes */}
                <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-200 w-32 h-24 text-center">
                        <svg className="w-8 h-8 text-[#16404D] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.282-8.452-3.527m16.904 0A23.931 23.931 0 0012 9c-3.183 0-6.22 1.282-8.452 3.527m16.904 0a3.527 3.527 0 01-4.995 0L12 7.005l-4.453 4.453a3.527 3.527 0 01-4.995 0m16.904 0a3.527 3.527 0 000-4.995L12 2.005l-4.453 4.453a3.527 3.527 0 00-4.995 0"></path>
                        </svg>
                        <span className="text-xl font-bold text-[#16404D]">{worker.experienceDisplay || `${worker.experience} Years`}</span>
                        <span className="text-xs opacity-80">Experience</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-200 w-32 h-24 text-center">
                        <svg className="w-8 h-8 text-[#DDA853] mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xl font-bold text-[#16404D]">{worker.ratingReview.rating || 'N/A'}</span>
                        <span className="text-xs opacity-80">Rating</span>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="relative bg-white rounded-t-[5px] rounded-b-[25px] shadow-lg -mt-8 pt-16 px-6 sm:px-8 pb-12 z-0">
                {/* About Section */}
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4 ">About</h2>
                    <p className="leading-relaxed">
                        {worker.about || "No description available."}
                    </p>
                </div>

                {/* Feedback and reviews Section */}
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4 ">Feedback and reviews</h2>
                    {
                        (() => {
                            let reviewsToDisplay = [];
                            if (Array.isArray(worker.ratingReview)) {
                                reviewsToDisplay = worker.ratingReview;
                            } else if (typeof worker.ratingReview === 'object' && worker.ratingReview !== null) {
                                reviewsToDisplay = [worker.ratingReview];
                            }

                            if (reviewsToDisplay.length > 0) {
                                return reviewsToDisplay.map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-100">
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${review.clientId || 'Anonymous'}&background=random&color=fff&size=32`} // Placeholder avatar
                                                alt={review.clientId || 'Anonymous'}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <h3 className="font-semibold">{review.clientId || 'Anonymous User'}</h3>
                                            <span className="ml-auto text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" 
                                                    fill={i < Math.floor(review.rating) ? '#DDA853' : '#E5E7EB'}

                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ));
                            } else {
                                return <p className="text-gray-600">No reviews yet for this worker.</p>;
                            }
                        })()
                    }
                </div>
                <div className="flex flex-col justify-center mt-8">
                    <button className="bg-[#16404D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c69542] transition-colors duration-200 text-lg">
                        Hire Now
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
} 