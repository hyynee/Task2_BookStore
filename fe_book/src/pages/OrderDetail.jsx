import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetail } from '../redux/Reducer/orderReducer';

const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetail, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrderDetail(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Order</h3>
                        <p className="text-red-600 mb-4">{error.message}</p>
                        <Link
                            to="/profile"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Orders
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!orderDetail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-500">Loading order details...</div>
            </div>
        );
    }

    const order = orderDetail.data;

    return (
        <div className="min-h-screen bg-gray-50 py-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/profile"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to My Orders
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Order Details</h1>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Order #{order._id.slice(-8).toUpperCase()}</h2>
                                <p className="text-blue-100 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 8a2 2 0 01-2 2H6a2 2 0 01-2-2l-2-8v-1a2 2 0 012-2h3z"></path>
                                    </svg>
                                    {new Date(order.createAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
                                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${order.isPaid
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${order.isPaid ? 'bg-green-200' : 'bg-red-200'
                                        }`}></div>
                                    {order.isPaid ? 'Payment Approved' : 'Payment Pending'}
                                </span>
                                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${order.isDelivery
                                    ? 'bg-green-500 text-white'
                                    : 'bg-yellow-500 text-white'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${order.isDelivery ? 'bg-green-200' : 'bg-yellow-200'
                                        }`}></div>
                                    {order.isDelivery ? 'Delivered' : 'In Transit'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Info Grid */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Payment Info */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Payment Info</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Method:</span> {order.paymentMethod}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Status:</span>
                                        <span className={`ml-1 font-semibold ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                            {order.isPaid ? "Paid" : "Unpaid"}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Shipping Info</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Method:</span> {order.shippingMethod}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Address:</span> {order.shippingAddress.city}, {order.shippingAddress.country}
                                    </p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-xl p-5 md:col-span-2 lg:col-span-1">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Order Summary</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Items:</span> {order.items.length}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Total:</span>
                                        <span className="ml-1 font-bold text-lg text-gray-900">
                                            ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Order Items ({order.items.length})
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item, index) => (
                                    <tr key={item.bookId} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16">
                                                    <img
                                                        className="h-16 w-16 rounded-xl object-cover shadow-md"
                                                        src={item.image}
                                                        alt={item.title}
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/64x64?text=Book';
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <Link
                                                        to={`/product/${item.bookId}`}
                                                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-sm text-gray-500 mt-1">ID: {item.bookId.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Total */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/profile"
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to My Orders
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                        </svg>
                        Print Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;