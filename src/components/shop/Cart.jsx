import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HammerLoading from '../Shared/HammerLoading';

export default function Cart() {
    const [cartData, setCartData] = useState({
        username: "",
        items: [],
        paymentIntentId: "",
        clientSecret: "",
        shippingPrice: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: () => {}
    });

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
        showModal(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            async () => {
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
            }
        );
    };

    const clearCart = async () => {
        showModal(
            "Clear Cart",
            "Are you sure you want to clear your entire cart? This action cannot be undone.",
            async () => {
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
            }
        );
    };

    if (loading) {
        return <HammerLoading />;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    }

    const subtotal = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + cartData.shippingPrice;

    return (
        <>
            <div className="px-4 sm:px-6 md:px-[5rem] py-[2rem] md:py-[3rem] w-full mx-auto mt-[2rem] md:mt-[3rem]">
                <h1 className="carttext text-[#16404D] text-2xl md:text-4xl font-extrabold text-center mb-[1.5rem] md:mb-[2rem]">My Cart</h1>
                
                {cartData.items.length > 0 ? (
                    <>
                        <div className="flex justify-center w-full mb-[5rem] ml-[4rem]">
                            {/* Shipping */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                    <div className="h-[2px] bg-gray-200 w-[12rem] absolute left-7 Line"></div>
                                </div>
                                <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Shopping</span>
                            </div>

                            {/* Payment */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-gray-200 flex items-center justify-center"></div>
                                    <div className="h-[2px] bg-gray-200 w-[12rem] absolute left-7 Line"></div>
                                </div>
                                <span className="absolute text-sm text-gray-500 left-[-0.8rem] top-10">Payment</span>
                            </div>

                            {/* shipping */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-gray-200 flex items-center justify-center"></div>
                                </div>
                                <span className="absolute text-sm text-gray-500 left-[-0.8rem] top-10">Shipping</span>
                            </div>
                        </div>

                        <div>
                            <div className="col-span-12 lg:col-span-8">
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="grid grid-cols-12 text-sm text-gray-500 px-[3.3rem] cartheader">
                                        <div className="col-span-6 text-[18px]">Item</div>
                                        <div className="col-span-2 text-right text-[18px]">Price</div>
                                        <div className="col-span-2 text-center text-[18px]">Quantity</div>
                                        <div className="col-span-2 text-right text-[18px]">Total</div>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="space-y-8 bg-[white] p-4 md:p-10 rounded-[25px]">
                                        {cartData.items.map((item, index) => (
                                            <div key={item.productId}>
                                                <div className="grid grid-cols-12 items-center gap-2 md:gap-4">
                                                    <div className="col-span-6">
                                                        <div className="flex items-center gap-2 removeimage">
                                                            <button 
                                                                className="text-gray-400 hover:text-[#16404D] text-xl font-medium"
                                                                onClick={() => removeItem(item.productId)}
                                                            >
                                                                ×
                                                            </button>
                                                            <img 
                                                                src={item.imageUrl || 'https://via.placeholder.com/300x200'} 
                                                                alt={item.productName} 
                                                                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-100"
                                                            />
                                                            <div>
                                                                <h3 className="font-medium text-lg line-clamp-2 proname">{item.productName}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 text-right text-lg proname">${item.price.toFixed(2)}</div>
                                                    <div className="col-span-2 flex justify-center items-center gap-2 md:gap-3">
                                                        <button 
                                                            className="w-5 h-5 ml-3 quantitybtn flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#16404D] hover:text-white hover:border-[#16404D] text-sm"
                                                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-lg proname">{item.quantity}</span>
                                                        <button 
                                                            className="w-5 h-5 quantitybtn flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#16404D] hover:text-white hover:border-[#16404D] text-sm"
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="col-span-2 text-right text-lg proname">${(item.price * item.quantity).toFixed(2)}</div>
                                                </div>
                                                {index < cartData.items.length - 1 && <hr className="my-4 md:my-8" />}
                                            </div>
                                        ))}

                                        {/* checkout section */}
                                        <hr/>
                                        <div className="rounded-[15px] p-6">
                                            <div className="flex justify-between items-start">
                                                <button 
                                                    onClick={clearCart}
                                                    className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 text-center py-auto my-auto text-[16px] clearbtn"
                                                >
                                                    Clear all Products
                                                </button>
                                                <div className="text-right space-y-2">
                                                    <div className="flex justify-end items-center">
                                                        <span className="text-gray-600 w-32 text-[18px] subtotal">Subtotal</span>
                                                        <span className="text-gray-600 w-24 text-right text-[18px] subtotal">${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-end items-center">
                                                        <span className="text-gray-600 w-32 text-[18px] subtotal">Delivery Fee</span>
                                                        <span className="text-[#16404D] w-24 text-right text-[18px] subtotal">${cartData.shippingPrice.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-end items-center pt-2 border-t bordertotal">
                                                        <span className="text-gray-600 w-30 font-bold text-[18px] subtotal">Total</span>
                                                        <span className="text-gray-600 w-24 text-right font-bold text-[18px] subtotal">${total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 pt-4 md:pt-8">
                                        <Link to="/Shop" className="w-full md:w-auto">
                                            <button className="text-[#16404D] hover:text-[#DDA853] w-full md:w-auto text-center text-sm md:text-base">
                                                ← Continue Shopping
                                            </button>
                                        </Link>
                                        <Link to='/Payment' className="w-full md:w-auto">
                                            <button className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 w-full md:w-[14rem] p-3 mx-0 md:mx-3 text-sm md:text-base">
                                                Checkout
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 md:py-16 bg-white rounded-[25px] shadow-lg">
                        <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-8">
                            <svg className="w-full h-full text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#16404D] mb-2 md:mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-4 md:mb-8 text-center max-w-md px-4 md:px-0 text-sm md:text-base">
                            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link to="/Shop" className="w-full md:w-auto px-4 md:px-0">
                            <button className="bg-[#16404D] text-white px-6 md:px-8 py-3 md:py-4 rounded-[25px] hover:bg-[#16404D]/90 transition-colors duration-200 text-base md:text-lg font-semibold flex items-center justify-center gap-2 w-full md:w-auto">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Custom Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[25px] p-6 md:p-8 max-w-md w-full mx-4 transform transition-all">
                        <div className="text-center">
                            <h3 className="text-xl md:text-2xl font-bold text-[#16404D] mb-3 md:mb-4">{modalConfig.title}</h3>
                            <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">{modalConfig.message}</p>
                            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
                                <button
                                    onClick={modalConfig.onCancel}
                                    className="px-4 md:px-6 py-2 md:py-3 border-2 border-[#16404D] text-[#16404D] rounded-[25px] hover:bg-gray-100 transition-colors w-full md:w-auto text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={modalConfig.onConfirm}
                                    className="px-4 md:px-6 py-2 md:py-3 bg-[#16404D] text-white rounded-[25px] hover:bg-opacity-90 transition-colors w-full md:w-auto text-sm md:text-base"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}