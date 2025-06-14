import visa from '../assets/visa.svg';
import masterCard from '../assets/Mastercard.svg';
import applePay from '../assets/applePay.svg';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams , useNavigate} from 'react-router-dom'; 
import { getUserLocation } from '../../src/geolocationHelper';


export default function BookingCheckout() {
    const { type, id } = useParams(); 
    const navigate = useNavigate();


    // State for booking details
    const [bookingDetails, setBookingDetails] = useState(null);
    const [paymentData, setPaymentData] = useState({
        userId: "",
        cardholderName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        selectedCard: "mastercard"
    });
    const [formErrors, setFormErrors] = useState({
        cardholderName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        message: '',
        onConfirm: () => { },
        onCancel: () => { }
    });

    const getUsername = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        const userId = tokenPayload.userId;
        if (!userId) {
            throw new Error('No user ID found in token');
        }

        return userId;
    };

    useEffect(() => {
        const userId = getUsername();
        setPaymentData(prev => ({
            ...prev,
            userId: userId
        }));

        // Fetch booking details based on type and id
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                // Placeholder for API endpoint for fetching worker/service/project details
                // You'll need to adapt this based on your actual API structure
                const url = `https://shatably.runasp.net/api/${type}s/${id}`; // Example: /api/workers/id, /api/services/id
                const token = localStorage.getItem('token');

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${type} details`);
                }

                const data = await response.json();
                // Transform data to a consistent structure if needed
                let transformedData = {};
                if (type === 'worker') {
                    transformedData = {
                        name: data.fullName,
                        price: data.price,
                    };
                } else if (type === 'service') {
                    transformedData = {
                        name: data.name,
                        price: data.price,
       
                    };
                } else if (type === 'project') {
                    transformedData = {
                        name: data.title,
                        price: data.price,

                    };
                }
                setBookingDetails(transformedData);
                setLoading(false);
            } catch (err) {
                console.error(`Error fetching ${type} details:`, err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (type && id) {
            fetchBookingDetails();
        } else {
            setError("Booking type or ID missing.");
            setLoading(false);
        }
    }, [type, id]);


    const showModal = (title, message, onConfirm) => {
        setModalConfig({
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setShowConfirmModal(false);
            },
            onCancel: () => setShowConfirmModal(false)
        });
        setShowConfirmModal(true);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            cardholderName: "",
            cardNumber: "",
            expirationDate: "",
            cvv: ""
        };

        if (!paymentData.cardholderName.trim()) {
            newErrors.cardholderName = "Cardholder name is required";
            isValid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(paymentData.cardholderName)) {
            newErrors.cardholderName = "Name should only contain letters and spaces";
            isValid = false;
        }

        if (!paymentData.cardNumber.trim()) {
            newErrors.cardNumber = "Card number is required";
            isValid = false;
        } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = "Card number must be 16 digits";
            isValid = false;
        }

        if (!paymentData.expirationDate.trim()) {
            newErrors.expirationDate = "Expiration date is required";
            isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentData.expirationDate)) {
            newErrors.expirationDate = "Use MM/YY format";
            isValid = false;
        } else {
            const [month, year] = paymentData.expirationDate.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                newErrors.expirationDate = "Card has expired";
                isValid = false;
            }
        }

        if (!paymentData.cvv.trim()) {
            newErrors.cvv = "CVV is required";
            isValid = false;
        } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
            newErrors.cvv = "CVV must be 3 or 4 digits";
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            await getUserLocation(); // Check for location before showing modal
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; // Stop payment if location access is denied
        }

        showModal(
            "Confirm Booking Payment",
            `Are you sure you want to confirm your booking for ${bookingDetails?.name} for $${bookingDetails?.price?.toFixed(2)}?`,
            async () => {
                try {
                    const userId = getUsername();
                    const token = localStorage.getItem('token');

                    // Prepare booking payment data
                    const bookingPaymentData = {
                        userId: userId,
                        bookingType: type, // worker, service, or project
                        bookingId: id,
                        amount: bookingDetails.price,
                        // Add other payment/booking specific fields if needed
                        cardholderName: paymentData.cardholderName,
                        cardNumber: paymentData.cardNumber,
                        expirationDate: paymentData.expirationDate,
                        cvv: paymentData.cvv,
                        selectedCard: paymentData.selectedCard,
                    };

                    // Placeholder for booking API endpoint
                    const response = await fetch('https://shatably.runasp.net/api/Basket', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(bookingPaymentData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to process booking payment');
                    }
                    // Update payment data
                    setPaymentData(prev => ({
                        ...prev,
                        userId: userId
                    }));

                    console.log('Dispatching booking payment notification...');
                    // Dispatch payment notification
                    window.dispatchEvent(new CustomEvent('paymentNotification', { 
                        detail: { 
                            message: `Booking payment successful! Your booking has been confirmed.`,
                            time: 'now',
                            type: 'booking'
                        } 
                    }));
                    console.log('Booking payment notification dispatched');

                    // On successful booking, you might want to redirect or show a success page
                    toast.success(`Thank you ${paymentData.cardholderName} for your booking of ${bookingDetails?.name}!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/ReviewBooking');

                } catch (error) {
                    ;
                    toast.error('Failed to process booking payment: ' + error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        } else if (name === 'expirationDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})/, '$1/')
                .substr(0, 5);
        }

        setPaymentData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleCardSelect = (cardType) => {
        setPaymentData(prev => ({
            ...prev,
            selectedCard: cardType
        }));
    };

    if (loading) {
        return <div className="text-center mt-20">Loading booking details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    }

    return (
        <>
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-[5rem] mx-auto">
                {/* Progress Steps - This will need to be adapted for booking flow (e.g., Details -> Confirmation -> Payment) */}
                <div className="max-w-4xl mx-0 ml-[10rem] mb-[5rem]">
                    <div className="flex justify-center items-center">
                        <div className="flex items-center">
                            {/* Payment */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                    <div className="h-[2px] bg-gray-200 w-[12rem] absolute left-7"></div>
                                </div>
                                <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Payment</span>
                            </div>

                            {/* Confirmation */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-gray-200 flex items-center justify-center"></div>
                                </div>
                                <span className="absolute text-sm text-gray-500 left-[-0.5rem] top-10">Confirmation</span>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 justify-center gap-[10rem]">
                        {/* Right Column - Payment Form (copied as is) */}
                        <div>
                            <div className="rounded-[25px] m-auto p-6 bg-white w-[30rem] h-[38rem]">
                                <h2 className="text-xl text-[#16404D] pt-[0.8rem] font-semibold mb-6 text-center">Checkout</h2>

                                {/* Payment Methods */}
                                <div className="flex gap-4 mb-8 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => handleCardSelect('mastercard')}
                                        className={`h-[3rem] w-[6rem]  p-3 rounded-[25px] transition-all duration-200 flex items-center justify-center
                                            ${paymentData.selectedCard === 'mastercard' ? 'bg-[#16404D]' : 'border-[#16404D] hover:bg-gray-300'}
                                        `}
                                    >
                                        <img
                                            src={masterCard}
                                            alt="Mastercard"
                                            className="h-[2.5rem] w-[4rem] hover:opacity-90 rounded-[25px]"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCardSelect('visa')}
                                        className={`h-[3rem] w-[6rem] rounded-[25px] transition-all duration-200 flex items-center justify-center
                                            ${paymentData.selectedCard === 'visa' ? 'bg-[#16404D]' : 'border-[#16404D]  hover:bg-gray-300'}
                                        `}
                                    >
                                        <img
                                            src={visa}
                                            alt="Visa"
                                            className={`h-[3rem] p-1 w-[6rem] hover:opacity-90 rounded-[25px] ${paymentData.selectedCard === 'visa' ? 'brightness-0 invert' : ''}`}
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCardSelect('applepay')}
                                        className={`h-[3rem] w-[6rem] rounded-[25px] transition-all duration-200 flex items-center justify-center
                                            ${paymentData.selectedCard === 'applepay' ? 'bg-[#16404D]' : 'border-[#16404D] hover:bg-gray-300'}
                                        `}
                                    >
                                        <img
                                            src={applePay}
                                            alt="Apple Pay"
                                            className={`h-[3rem] p-1 w-[6rem] hover:opacity-90 rounded-[25px] ${paymentData.selectedCard === 'applepay' ? 'brightness-0 invert' : ''}`}
                                        />
                                    </button>
                                </div>

                                {/* Payment Form */}
                                <form className="space-y-8" onSubmit={handlePaymentSubmit}>
                                    <div>
                                        <label className="block text-[#16404D] mb-2">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            value={paymentData.cardholderName}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D] ${formErrors.cardholderName ? 'border-2 border-red-500' : ''}`}
                                            placeholder="John Doe"
                                        />
                                        {formErrors.cardholderName && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.cardholderName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[#16404D] mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentData.cardNumber}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D] ${formErrors.cardNumber ? 'border-2 border-red-500' : ''}`}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                        {formErrors.cardNumber && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[#16404D] mb-2">Expiration Date</label>
                                            <input
                                                type="text"
                                                name="expirationDate"
                                                value={paymentData.expirationDate}
                                                onChange={handleInputChange}
                                                className={`w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D] ${formErrors.expirationDate ? 'border-2 border-red-500' : ''}`}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                            />
                                            {formErrors.expirationDate && (
                                                <p className="text-red-500 text-sm mt-1">{formErrors.expirationDate}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-[#16404D] mb-2">CVV</label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                value={paymentData.cvv}
                                                onChange={handleInputChange}
                                                className={`w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D] ${formErrors.cvv ? 'border-2 border-red-500' : ''}`}
                                                placeholder="123"
                                                maxLength="4"
                                            />
                                            {formErrors.cvv && (
                                                <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#16404D] text-[18px] text-white py-3 rounded-[25px] hover:bg-opacity-90 transition-colors"
                                    >
                                        Pay now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        

            {/* Custom Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-[25px] p-8 max-w-md w-full mx-4 transform transition-all">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-[#16404D] mb-4">{modalConfig.title}</h3>
                            <p className="text-gray-600 mb-8">{modalConfig.message}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={modalConfig.onCancel}
                                    className="px-6 py-3 border-2 border-[#16404D] text-[#16404D] rounded-[25px] hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={modalConfig.onConfirm}
                                    className="px-6 py-3 bg-[#16404D] text-white rounded-[25px] hover:bg-opacity-90 transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <div className="toast-container">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    );
} 