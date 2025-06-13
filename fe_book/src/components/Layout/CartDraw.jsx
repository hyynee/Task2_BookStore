import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const CartDraw = ({ drawerOpen, toggleCardDrawer }) => {
    // Mock cart data since no API is implemented
    const cartItems = [
        { id: 1, name: 'Men’s T-Shirt', price: 29.99, quantity: 2, image: 'https://via.placeholder.com/80' },
        { id: 2, name: 'Women’s Jeans', price: 59.99, quantity: 1, image: 'https://via.placeholder.com/80' },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={toggleCardDrawer}>
                    <IoClose className="size-6 text-gray-600" />
                </button>
            </div>
            <div className="p-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-lg font-semibold">${total}</span>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={toggleCardDrawer}
                            className="block w-full bg-orange-400 text-white text-center py-2 rounded-full mt-4 hover:bg-orange-500 transition-all"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDraw;