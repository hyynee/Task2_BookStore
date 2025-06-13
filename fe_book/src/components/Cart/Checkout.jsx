import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: '',
    });

    // Mock user and cart data (no Redux or API)
    const user = { email: 'user@example.com' };
    const cart = {
        products: [
            {
                id: 1,
                name: 'The Great Gatsby',
                price: 12.99,
                image: 'https://via.placeholder.com/80x96',
                quantity: 2,
            },
            {
                id: 2,
                name: 'To Kill a Mockingbird',
                price: 15.99,
                image: 'https://via.placeholder.com/80x96',
                quantity: 1,
            },
        ],
        totalPrice: 28.97,
    };

    // Mock checkout ID state for toggling PayPal button
    const [checkoutId, setCheckoutId] = useState(null);

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        // Simulate creating a checkout without API
        setCheckoutId('mock-checkout-id');
    };

    const handlePaymentSuccess = () => {
        // Simulate successful payment without API
        navigate('/order-confirmation');
    };

    // Redirect to home if cart is empty
    if (!cart || !cart.products || cart.products.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* Left: Shipping Form */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Check out</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Detail</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, address: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, country: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={shippingAddress.phone}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, phone: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        {!checkoutId ? (
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Continue to Payment
                            </button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                                <button
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    onClick={handlePaymentSuccess}
                                >
                                    PayPal (Mock)
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            {/* Right: Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-6">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((prod) => (
                        <div key={prod.id} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start">
                                <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-20 h-24 object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-md">{prod.name}</h3>
                                    <p className="text-gray-700">Format: {prod.size}</p>
                                    <p className="text-gray-700">Cover: {prod.color}</p>
                                    <p className="text-gray-700">Quantity: {prod.quantity}</p>
                                </div>
                            </div>
                            <p className="text-xl">${(prod.price * prod.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${cart.totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <p>${cart.totalPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;