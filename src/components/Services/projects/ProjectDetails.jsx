import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewsSection from '../ReviewsSection';
import HammerLoading from '../../Shared/HammerLoading';
import CreativeError from '../../Shared/CreativeError';

export default function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`https://shatably.runasp.net/api/Projects/${projectId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                console.error("Failed to fetch project details:", err);
                setError("Failed to load project details. Please try again later.");
                toast.error("Failed to load project details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (loading) {
        return <HammerLoading />;
    }

    if (error) {
        return <CreativeError message={error} />;
    }

    if (!project) {
        return <div className="text-center mt-20 text-xl">Project not found.</div>;
    }

    return (
        <div className="sm:px-6 lg:px-8 mb-[100px] mt-[5rem]">
            <Link
                to="/services"
                className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-[#16404D] bg-gray-100 rounded-md hover:bg-gray-200"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </Link>
            <div className="max-w-4xl mx-auto py-12 bg-white rounded-[25px] shadow-md p-8">
                <h1 className="text-3xl font-bold mb-4 text-[#16404D]">{project.title}</h1>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-3/4">
                        {project.mainImageUrl && (
                            <img src={project.mainImageUrl} alt={project.title} className="w-full h-80 object-cover object-top rounded-md" />
                        )}
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col gap-4">
                        {project.imageUrls && Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? (
                            project.imageUrls.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`${project.title} gallery image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-md"
                                />
                            ))
                        ) : (
                            // Placeholder images if no gallery images are available
                            <>
                                <img src="https://via.placeholder.com/100x100?text=Gallery+Image+1" alt="Placeholder Gallery Image 1" className="w-full h-24 object-cover rounded-md" />
                                <img src="https://via.placeholder.com/100x100?text=Gallery+Image+2" alt="Placeholder Gallery Image 2" className="w-full h-24 object-cover rounded-md" />
                                <img src="https://via.placeholder.com/100x100?text=Gallery+Image+3" alt="Placeholder Gallery Image 3" className="w-full h-24 object-cover rounded-md" />
                            </>
                        )}
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>

                {/* Reviews Section */}
                <ReviewsSection
                    reviews={project.ratingReview}
                    averageRating={project.ratingReview.rating}
                    reviewCount={project.reviewCount}
                />

                {project.price &&
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{project.hourServiceDisplay}</span>
                    </div>
                    <div className="flex items-baseline">
                        {/* Hardcoded discount for display */}
                         <p className="text-lg font-semibold mb-2">{project.price} EGP</p>
                        <p className="text-sm text-red-500 line-through ml-1">20%</p>
                    </div>
                    </div>
                }
                <div className='flex flex-col justify-center '>
                    <Link to={`/Booking/project/${projectId}`} className="mt-2 px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#16404D]/90 w-full text-center">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
} 