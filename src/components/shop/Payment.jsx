import visa from '../../assets/visa.svg';
import masterCard from '../../assets/Mastercard.svg';
import applePay from '../../assets/applePay.svg';
import { useState, useEffect } from 'react';

export default function Payment() {
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
        cvv: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);

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

            const updatedCart = {
                ...cartData,
                items: updatedItems,
                username: username
            };

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

    const removeItem = async (itemId) => {
        // Ask for confirmation before removing
        if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
            return; // If user clicks Cancel, do nothing
        }

        try {
            const username = getUsername();
            const token = localStorage.getItem('token');

            const updatedItems = cartData.items.filter(item => item.productId !== itemId);
            const updatedCart = {
                ...cartData,
                items: updatedItems,
                username: username
            };

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
    };

    const clearCart = async () => {
        // Ask for confirmation before clearing
        if (!window.confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
            return; // If user clicks Cancel, do nothing
        }

        try {
            const username = getUsername();
            const token = localStorage.getItem('token');

            const emptyCart = {
                ...cartData,
                items: [],
                username: username
            };

            console.log('Clearing cart:', emptyCart);

            const response = await fetch('https://shatably.runasp.net/api/Basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(emptyCart)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to clear cart');
            }

            const result = await response.json();
            console.log('Clear cart response:', result);
            setCartData(result);
            
            // Dispatch custom event for cart update
            window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: 0 } }));
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert('Failed to clear cart: ' + error.message);
        }
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const userId = getUsername();
        setPaymentData(prev => ({
            ...prev,
            userId: userId
        }));
        clearCart();
        alert(`Thank you ${paymentData.cardholderName} for your payment!`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
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
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-[5rem] mx-auto">
            {/* Progress Steps */}
            <div className="max-w-4xl mx-0 ml-[10rem] mb-[5rem]">
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        {/* Shipping */}
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

                        {/* Review */}
                        <div className="relative w-[12rem]">
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-[50%] bg-gray-200 flex items-center justify-center"></div>
                            </div>
                            <span className="absolute text-sm text-gray-500 left-[-0.5rem] top-10">Review</span>
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

                            {/* Items List */}
                            <div className="space-y-4">
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
                        <div className=" rounded-[25px] p-6 bg-white w-[30rem] h-[38rem]">
                            <h2 className="text-xl text-[#16404D] pt-[0.8rem] font-semibold mb-6 text-center">Checkout</h2>

                            {/* Payment Methods */}
                            <div className="flex gap-4 mb-8 justify-center">
                                <img src={masterCard} alt="Mastercard" className="h-[3rem] p-1 w-[6rem] bg-[#16404D] hover:opacity-90 rounded-[25px]" />
                                <img src={visa} alt="Visa" className="h-[3rem] p-[0.95rem] w-[6rem] bg-[#16404D] hover:opacity-90 rounded-[25px]" />
                                <img src={applePay} alt="PayPal" className="h-[3rem] p-0 w-[6rem] bg-[#16404D] hover:opacity-90 rounded-[25px]" />
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
                                        className="w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#16404D] mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentData.cardNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D]"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#16404D] mb-2">Expiration Date</label>
                                        <input
                                            type="text"
                                            name="expirationDate"
                                            value={paymentData.expirationDate}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#16404D] mb-2">CVV</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={paymentData.cvv}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D]"
                                            required
                                        />
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
    );
}