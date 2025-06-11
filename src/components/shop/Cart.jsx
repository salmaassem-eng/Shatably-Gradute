import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

    if (loading) {
        return <div className="text-center mt-20">Loading cart items...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    }

    const subtotal = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + cartData.shippingPrice;

    return (
        <div className="px-[5rem] py-[3rem] w-full mx-auto mt-[5rem]">
            <h1 className="text-[#16404D] text-4xl font-extrabold text-center mb-[5rem]">My Cart</h1>
            
            <div>
                <div className="col-span-12 lg:col-span-8">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="grid grid-cols-12 text-sm text-gray-500 px-[3.3rem]">
                            <div className="col-span-6 text-[18px]">Item</div>
                            <div className="col-span-2 text-right text-[18px]">Price</div>
                            <div className="col-span-2 text-center text-[18px]">Quantity</div>
                            <div className="col-span-2 text-right text-[18px]">Total</div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-8 bg-[white] p-10 rounded-[25px]">
                            {cartData.items.length > 0 ? (
                                cartData.items.map((item, index) => (
                                    <div key={item.productId}>
                                        <div className="grid grid-cols-12 items-center">
                                            <div className="col-span-6">
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        className="text-gray-400 hover:text-[#16404D] text-xl font-medium"
                                                        onClick={() => removeItem(item.productId)}
                                                    >
                                                        ×
                                                    </button>
                                                    <img 
                                                        src={item.imageUrl || 'https://via.placeholder.com/300x200'} 
                                                        alt={item.productName} 
                                                        className="w-20 h-20 object-cover rounded-lg bg-gray-100" 
                                                    />
                                                    <div>
                                                        <h3 className="font-medium">{item.productName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-right">${item.price.toFixed(2)}</div>
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
                                            <div className="col-span-2 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                        {index < cartData.items.length - 1 && <hr className="my-8" />}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Your cart is empty
                                </div>
                            )}

                            {/* checkout section */}
                            <hr/>
                            <div className="rounded-[15px] p-6">
                                <div className="flex justify-between items-start">
                                    <button 
                                        onClick={clearCart}
                                        className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 text-center py-auto my-auto text-[16px]"
                                    >
                                        Clear all Products
                                    </button>
                                    <div className="text-right space-y-2">
                                        <div className="flex justify-end items-center">
                                            <span className="text-gray-600 w-32 text-[18px]">Subtotal</span>
                                            <span className="text-gray-600 w-24 text-right text-[18px]">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <span className="text-gray-600 w-32 text-[18px]">Delivery Fee</span>
                                            <span className="text-[#16404D] w-24 text-right text-[18px]">${cartData.shippingPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-end items-center pt-2 border-t">
                                            <span className="text-gray-600 w-32 font-bold text-[18px]">Total</span>
                                            <span className="text-gray-600 w-24 text-right font-bold text-[18px]">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-8">
                            <Link to="/Shop">
                                <button className="text-[#16404D] hover:text-[#DDA853]">
                                    ← Continue Shopping
                                </button>
                            </Link>
                            <button className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 w-[14rem] p-3 mx-3">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}