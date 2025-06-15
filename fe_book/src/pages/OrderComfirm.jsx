import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/Reducer/cartReducer';

const OrderConfirm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // Clear cart if payment success
    useEffect(() => {
        if (checkout && checkout.checkout._id) {
            dispatch(clearCart());
        } else {
            navigate('/profile');
        }
    }, [checkout, dispatch, navigate]);

    const calculateEstimatedDelivery = (date) => {
        const orderDate = new Date(date);
        orderDate.setDate(orderDate.getDate() + 10); // 10 days
        return orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!checkout) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        );
    }

    const order = checkout.checkout;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 py-30">
            <div className="max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Thank you for your purchase! Your order has been successfully placed and is being processed.
                    </p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-8 text-white">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Order #{order._id.slice(-8).toUpperCase()}</h2>
                                <p className="text-emerald-100 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 8a2 2 0 01-2 2H6a2 2 0 01-2-2l-2-8v-1a2 2 0 012-2h3z"></path>
                                    </svg>
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div className="mt-4 lg:mt-0">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                    <p className="text-emerald-100 text-sm font-medium">Estimated Delivery</p>
                                    <p className="text-white text-lg font-bold">
                                        {calculateEstimatedDelivery(order.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Status */}
                    <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-700">Order Placed</span>
                                    </div>
                                    <div className="w-12 h-1 bg-gray-300 rounded"></div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-500">Processing</span>
                                    </div>
                                    <div className="w-12 h-1 bg-gray-300 rounded"></div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                            </svg>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-500">Delivered</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                                    Payment {order.paymentStatus}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                    Processing
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-8 py-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Order Items ({order.checkoutItems.length})
                        </h3>

                        <div className="space-y-4 mb-8">
                            {order.checkoutItems.map((item, index) => (
                                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/80x80?text=Book';
                                            }}
                                        />
                                    </div>
                                    <div className="ml-6 flex-grow">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-500">Book ID: {item.bookId.slice(-6)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        <p className="text-sm font-semibold text-emerald-600">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Total */}
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold text-gray-900">Order Total:</span>
                                <span className="text-3xl font-bold text-emerald-600">${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment & Delivery Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Payment Info */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">Payment Method</h4>
                                </div>
                                <p className="text-gray-700 font-medium">{order.paymentMethod}</p>
                                <p className="text-sm text-gray-500 mt-1">Status: {order.paymentStatus}</p>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">Delivery Address</h4>
                                </div>
                                <div className="space-y-1 text-gray-700">
                                    <p className="font-medium">{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/profile"
                        className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        View My Orders
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-200 font-semibold"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
                        </svg>
                        Continue Shopping
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                        </svg>
                        Print Receipt
                    </button>
                </div>

                {/* Thank You Message */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We appreciate your business and will process your order as quickly as possible.
                            You'll receive email updates about your order status and tracking information once your items ship.
                        </p>
                        <div className="mt-6 flex justify-center space-x-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Email Updates</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Order Tracking</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">24/7 Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirm;