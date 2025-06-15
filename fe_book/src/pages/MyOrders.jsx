import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrdersUser } from '../redux/Reducer/orderReducer';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);
    console.log("MyOrders", orders);
    useEffect(() => {
        dispatch(fetchOrdersUser());
    }, [dispatch])
    const handleRowClick = (id) => {
        navigate(`/order/${id}`);
    };
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='px-4 py-2 sm:py-3'>Image</th>
                            <th className='px-4 py-2 sm:py-3'>Order ID</th>
                            <th className='px-4 py-2 sm:py-3'>Created</th>
                            <th className='px-4 py-2 sm:py-3'>Shipping Address</th>
                            <th className='px-4 py-2 sm:py-3'>Items</th>
                            <th className='px-4 py-2 sm:py-3'>Price</th>
                            <th className='px-4 py-2 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data ? (
                            orders?.data.map((order, index) => (
                                <tr
                                    key={order._id || index}
                                    onClick={() => handleRowClick(order._id)}
                                    className={`border-t border-gray-200 ${order.isPaid ? 'bg-gray-100' : 'bg-gray-50'}`}
                                >
                                    <td className='px-4 py-2 sm:py-3'>
                                        <img
                                            src={order.items[0].image}
                                            alt={order.items[0].name}
                                            className='w-16 h-16 object-cover'
                                        />
                                    </td>
                                    <td className='px-4 py-2 sm:py-3'>{order._id}</td>
                                    <td className='px-4 py-2 sm:py-3'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className='px-4 py-2 sm:py-3'>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                                    </td>
                                    <td className='px-4 py-2 sm:py-3'>{order.items.length}</td>
                                    <td className='px-4 py-2 sm:py-3'>{order.totalPrice}</td>
                                    <td className='px-4 py-2 sm:py-3'>
                                        <span className={`${order.isPaid ? 'bg-green-300' : 'bg-yellow-500'} text-white text-xs font-bold px-2 py-1`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='text-center py-4 px-4 text-gray-500'>No orders</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders