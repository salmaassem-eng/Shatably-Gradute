import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingForm from './BookingForm';
import BookingSummary from './BookingSummary';
import HammerLoading from '../components/Shared/HammerLoading';

export default function BookService() {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        duration: '1',
        address: '',
        notes: '',
        contactPhone: '',
        contactName: ''
    });

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                let endpoint = '';
                
                switch(type) {
                    case 'worker':
                        endpoint = `https://shatably.runasp.net/api/Workers/${id}`;
                        break;
                    case 'service':
                        endpoint = `https://shatably.runasp.net/api/Services/${id}`;
                        break;
                    case 'project':
                        endpoint = `https://shatably.runasp.net/api/Projects/${id}`;
                        break;
                    default:
                        throw new Error('Invalid booking type');
                }

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                // Transform the data based on type
                let transformedData = {};
                switch(type) {
                    case 'worker':
                        transformedData = {
                            id: data.workerId,
                            fullName: data.fullName,
                            type: data.type,
                            price: data.price,
                            profilePhotoUrl: data.profilePhotoUrl,
                            experience: data.experience,
                            ratingReview: data.ratingReview.rating || []
                        };
                        break;
                    case 'service':
                        transformedData = {
                            id: data.serviceId,
                            title: data.name,
                            description: data.description,
                            price: data.price,
                            mainImageURL: data.imageUrl,
                            averageRating: data.averageRating,
                            reviewCount: data.reviewCount
                        };
                        break;
                    case 'project':
                        transformedData = {
                            id: data.projectId,
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            mainImageURL: data.mainImageUrl,
                        };
                        break;
                }
                
                console.log('Fetched data:', data);
                console.log('Transformed data:', transformedData);
                setBookingData(transformedData);
            } catch (err) {
                console.error("Failed to fetch booking data:", err);
                setError("Failed to load booking details. Please try again later.");
                toast.error("Failed to load booking details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [type, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you would typically make an API call to create the booking
            // For now, we'll just show a success message
            toast.success("Booking submitted successfully!");
            navigate('/'); // Redirect to home page after successful booking
        } catch (err) {
            console.error("Failed to submit booking:", err);
            toast.error("Failed to submit booking. Please try again.");
        }
    };

    if (loading) {
        return <HammerLoading />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-[4rem]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#16404D]">
                        Book {type === 'worker' ? 'Worker' : type === 'service' ? 'Service' : 'Project'}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Complete the form below to schedule your booking
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[25px] shadow-lg p-6">
                        <BookingForm 
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    
                    <div className="bg-white rounded-[25px] shadow-lg p-6">
                        <BookingSummary 
                            bookingData={bookingData}
                            formData={formData}
                            type={type}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 