import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookCartContents from '../Cart/BookCartContents';
const CartDraw = ({ drawerOpen, toggleCardDrawer }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { user, guestId } = useSelector(state => state.auth);
    const userId = user ? user?._id : null;

    // useEffect(() => {
    //     if (drawerOpen && (userId || guestId)) {
    //         dispatch(fetchCart({ userId, guestId }));
    //     }
    // }, [dispatch, drawerOpen, userId, guestId]);

    const cartItems = cart?.items || [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

            <div className="p-4 flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <>
                        {/*  BookCartContents  */}
                        <BookCartContents
                            cart={cart}
                            userId={userId}
                            guestId={guestId}
                        />

                        {/*  Checkout  */}
                        <div className="mt-6 pt-4 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-lg font-semibold">
                                    {Number(total)?.toLocaleString("vi-VN")} VND
                                </span>
                            </div>
                            <Link
                                to="/checkout"
                                onClick={toggleCardDrawer}
                                className="block w-full bg-orange-400 text-white text-center py-2 rounded-full hover:bg-orange-500 transition-all"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDraw;