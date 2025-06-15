import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/Reducer/cartReducer';

const BookCartContents = ({ cart, userId, guestId, isDrawer = false }) => {
    const dispatch = useDispatch();

    const handleUpdateQuantity = (bookId, delta, currentQuantity) => {
        const newQuantity = currentQuantity + delta;

        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                userId,
                guestId,
                bookId,
                quantity: newQuantity
            }));
        }
    };

    const handleRemoveFromCart = (bookId) => {
        dispatch(removeFromCart({
            userId,
            guestId,
            bookId
        }));
    };

    const cartItems = cart?.items || [];
    console.log('Cart Items:', cartItems);
    return (
        <div className="space-y-4">
            {cartItems.map((item, index) => {
                return (
                    <div
                        key={item._id || index}
                        className={`flex items-start justify-between border-b border-gray-200 pb-4 ${isDrawer ? 'last:border-b-0' : 'py-4'
                            }`}
                    >
                        <div className='flex items-start'>
                            <img
                                src={item?.image}
                                alt={item?.title}
                                className={`object-cover mr-3 ${isDrawer ? 'w-16 h-20' : 'w-20 h-24'
                                    }`}
                            />
                            <div className="flex-1">
                                <h3 className={`font-medium ${isDrawer ? 'text-sm' : 'text-base'
                                    }`}>
                                    Name: {item.title}
                                </h3>
                                <p className={`text-gray-500 ${isDrawer ? 'text-xs' : 'text-sm'
                                    }`}>
                                    BookID: {item?.bookId}
                                </p>
                                {item.isbn && !isDrawer && (
                                    <p className='text-xs text-gray-400'>
                                        ISBN: {item.isbn}
                                    </p>
                                )}

                                {/* Quantity controls */}
                                <div className={`flex items-center ${isDrawer ? 'mt-1' : 'mt-2'
                                    }`}>
                                    <button
                                        onClick={() => handleUpdateQuantity(
                                            item._id || item.bookId,
                                            -1,
                                            item.quantity
                                        )}
                                        className='border rounded px-2 py-1 text-xs font-medium hover:bg-gray-100'
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className='mx-3 min-w-[20px] text-center text-sm'>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleUpdateQuantity(
                                            item._id || item.bookId,
                                            1,
                                            item.quantity
                                        )}
                                        className='border rounded px-2 py-1 text-xs font-medium hover:bg-gray-100'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-end ml-2'>
                            <p className={`font-medium ${isDrawer ? 'text-sm' : 'text-base'
                                }`}>
                                {Number(item.price)?.toLocaleString("vi-VN")} VND
                            </p>
                            {!isDrawer && (
                                <p className='text-sm text-gray-500'>
                                    Subtotal: {Number(item.price * item.quantity)?.toLocaleString("vi-VN")} VND
                                </p>
                            )}
                            <button
                                onClick={() => handleRemoveFromCart(item._id || item.bookId)}
                                className='mt-1 hover:bg-red-50 p-1 rounded'
                            >
                                <RiDeleteBin6Line className='text-red-500 size-4' />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BookCartContents;