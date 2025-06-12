import React from 'react';

const ReviewsSection = ({ reviews, averageRating, reviewCount }) => {
    // Ensure reviews is an array, even if a single object or null
    let reviewsToDisplay = [];
    if (Array.isArray(reviews)) {
        reviewsToDisplay = reviews;
    } else if (typeof reviews === 'object' && reviews !== null) {
        reviewsToDisplay = [reviews];
    }

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Feedback and reviews</h2>
            {averageRating !== undefined && (
                <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                        <svg
                            key={i}
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                                fill={i < Math.floor(averageRating) ? '#DDA853' : '#E5E7EB'}
                            />
                        </svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">({reviewCount || 0} reviews)</span>
                </div>
            )}

            {reviewsToDisplay.length > 0 ? (
                reviewsToDisplay.map((review, index) => (
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
                ))
            ) : (
                <p className="text-gray-600">No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewsSection; 