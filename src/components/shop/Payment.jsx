import visa from '../../assets/visa.svg';
import masterCard from '../../assets/Mastercard.svg';
import applePay from '../../assets/applePay.svg';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserLocation } from '../../../src/geolocationHelper';

export default function Payment() {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState({
        username: "",
        items: [],
        paymentIntentId: "",
        clientSecret: "",
        shippingPrice: 0
    });
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
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: () => {}
    });

    useEffect(() => {
        const handleCartUpdate = (event) => {
            setCartItemsCount(event.detail.count);
        };

        window.addEventListener('cartUpdate', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdate', handleCartUpdate);
        };
    }, []);


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
        console.log('Token payload:', tokenPayload);

        // Get userId from token
        const userId = tokenPayload.userId;
        if (!userId) {
            throw new Error('No user ID found in token');
        }

        return userId; // Using userId as username since that's what we get from token
    };
    useEffect(() => {
        fetchCartItems();
        // Set userId in paymentData when component mounts
        const userId = getUsername();
        setPaymentData(prev => ({
            ...prev,
            userId: userId
        }));
    }, []);

    const fetchCartItems = async () => {
        try {
            const username = getUsername(); // gets userId from token
            const token = localStorage.getItem('token');

            console.log('Fetching cart for user:', username);

            const response = await fetch(`https://shatably.runasp.net/api/Basket/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // If response is 404 (Not Found) or any other error, initialize empty cart
            if (!response.ok) {
                console.log('No existing cart found, initializing empty cart');
                setCartData({
                    username,
                    items: [],
                    paymentIntentId: "",
                    clientSecret: "",
                    shippingPrice: 0
                });
                setLoading(false);
                return;
            }

            const data = await response.json();
            const totalItems = data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            setCartItemsCount(totalItems);
            console.log('Received cart data:', data);
            setCartData(data || {
                username,
                items: [],
                paymentIntentId: "",
                clientSecret: "",
                shippingPrice: 0
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            // Initialize empty cart on error
            const username = getUsername();
            setCartData({
                username,
                items: [],
                paymentIntentId: "",
                clientSecret: "",
                shippingPrice: 0
            });
            setError(null); // Clear error since we're handling it gracefully
            setLoading(false);
        }
    };


    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const username = getUsername();
            const token = localStorage.getItem('token');

            const updatedItems = cartData.items.map(item =>
                item.productId === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            );

            const updatedCart = { ...cartData, items: updatedItems, username: username };

            console.log('Updating cart with:', updatedCart);

            const response = await fetch('https://shatably.runasp.net/api/Basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedCart)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to update quantity');
            }

            const result = await response.json();
            console.log('Update quantity response:', result);
            setCartData(result);

            // Dispatch custom event for cart update
            const totalItems = result.items.reduce((sum, item) => sum + item.quantity, 0);
            window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: totalItems } }));
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity: ' + error.message);
        }
    };

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

    const removeItem = async (itemId) => {
        showModal(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            async () => {
        try {
            const username = getUsername();
            const token = localStorage.getItem('token');

            const updatedItems = cartData.items.filter(item => item.productId !== itemId);
                    const updatedCart = { ...cartData, items: updatedItems, username: username };

            console.log('Removing item, updated cart:', updatedCart);

            const response = await fetch('https://shatably.runasp.net/api/Basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedCart)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to remove item');
            }

            const result = await response.json();
            console.log('Remove item response:', result);
            setCartData(result);
            
            // Dispatch custom event for cart update
            const totalItems = result.items.reduce((sum, item) => sum + item.quantity, 0);
            window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: totalItems } }));
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item: ' + error.message);
        }
            }
        );
    };

    const clearCart = async () => {
        showModal(
            "Clear Cart",
            "Are you sure you want to clear your entire cart?",
            async () => {
        try {
            const username = getUsername();
            const token = localStorage.getItem('token');

                    const emptyCart = { ...cartData, items: [], username: username };

            const response = await fetch('https://shatably.runasp.net/api/Basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(emptyCart)
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }

            const result = await response.json();
            setCartData(result);
            
            window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: 0 } }));

                    toast.success('Your cart has been cleared successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
        } catch (error) {
            console.error('Error clearing cart:', error);
                    toast.error('Failed to clear cart: ' + error.message, {
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

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            cardholderName: "",
            cardNumber: "",
            expirationDate: "",
            cvv: ""
        };

        // Cardholder Name validation
        if (!paymentData.cardholderName.trim()) {
            newErrors.cardholderName = "Cardholder name is required";
            isValid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(paymentData.cardholderName)) {
            newErrors.cardholderName = "Name should only contain letters and spaces";
            isValid = false;
        }

        // Card Number validation
        if (!paymentData.cardNumber.trim()) {
            newErrors.cardNumber = "Card number is required";
            isValid = false;
        } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = "Card number must be 16 digits";
            isValid = false;
        }

        // Expiration Date validation
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

        // CVV validation
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
            "Confirm Payment",
            `Are you sure you want to proceed with the payment of $${total.toFixed(2)}?`,
            async () => {
                try {
                    const userId = getUsername();
                    const token = localStorage.getItem('token');

                    // Clear the cart
                    const emptyCart = { ...cartData, items: [], username: userId };
                    const response = await fetch('https://shatably.runasp.net/api/Basket', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(emptyCart)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to process payment');
                    }

                    const result = await response.json();
                    setCartData(result);
                    
                    // Update payment data
                    setPaymentData(prev => ({
                        ...prev,
                        userId: userId
                    }));

                    // Update cart count
                    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: 0 } }));

                    // Show success message
                    toast.success(`Thank you ${paymentData.cardholderName} for your payment!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    // Navigate to Review page after successful payment
                    navigate('/Review');
                } catch (error) {
                    console.error('Error processing payment:', error);
                    toast.error('Failed to process payment: ' + error.message, {
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

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        // Format expiration date
        else if (name === 'expirationDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})/, '$1/')
                .substr(0, 5);
        }

        setPaymentData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Clear error when user starts typing
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
        return <div className="text-center mt-20">Loading cart items...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    }

    const subtotal = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + cartData.shippingPrice;

    return (
        <>
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-[5rem] mx-auto">
            {/* Progress Steps */}
            <div className="max-w-4xl mx-0 ml-[10rem] mb-[5rem]">
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        {/* Shopping */}
                        <div className="relative w-[12rem] ">
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                <div className="h-[2px] bg-[#16404D] w-[12rem] absolute left-6"></div>
                            </div>
                            <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Shopping</span>
                        </div>

                        {/* Payment */}
                        <div className="relative w-[12rem]">
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                <div className="h-[2px] bg-gray-200 w-[12rem] absolute left-7"></div>
                            </div>
                            <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Payment</span>
                        </div>

                        {/* Shipping */}
                        <div className="relative w-[12rem]">
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-[50%] bg-gray-200 flex items-center justify-center"></div>
                            </div>
                            <span className="absolute text-sm text-gray-500 left-[-0.8rem] top-10">Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10rem]">
                    {/* Left Column - Items List */}
                    <div>
                        <div className="p-[2rem] mb-6 bg-white rounded-[25px] w-[30rem]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-[#16404D] font-bold text-xl">
                                    Items <span className="text-gray-500 font-normal">({cartItemsCount} items)</span>
                                </h2>
                                <button
                                    onClick={clearCart}
                                    className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 text-center py-auto my-auto text-[16px]"
                                >
                                    Remove All
                                </button>
                            </div>

                                {/* Items List - Added max-height and overflow-y-auto */}
                                <div className="space-y-4 max-h-[20rem] overflow-y-auto pr-2  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#16404D] [&::-webkit-scrollbar-thumb]:rounded-full" >
                                {cartData.items.map((item) => (
                                    <div key={item.productId} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.imageUrl || 'https://via.placeholder.com/300x200'} 
                                                alt={item.productName} 
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-[#16404D] text-lg font-medium">{item.productName}</h3>
                                                    </div>
                                                    <button
                                                        className="text-gray-400 hover:text-gray-600"
                                                        onClick={() => removeItem(item.productId)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="col-span-2 flex justify-center items-center gap-3">
                                                        <button
                                                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#16404D] hover:text-white hover:border-[#16404D]"
                                                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#16404D] hover:text-white hover:border-[#16404D]"
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="text-[#16404D] font-medium">${item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary - Separated */}
                        <div className="bg-white rounded-[25px] p-6 w-[30rem] shadow-sm">
                            <h3 className="text-[#16404D] text-xl font-bold mb-4">Order summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="text-[#16404D]">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-[#16404D]">${cartData.shippingPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between  text-[#16404D] font-bold pt-3 border-t">
                                    <span>Total Price</span>
                                    <span className='font-bold'>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Form */}
                    <div>
                            <div className="rounded-[25px] p-6 bg-white w-[30rem] h-[38rem]">
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