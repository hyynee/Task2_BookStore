import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBestSellerBooks } from '../../redux/Reducer/bookReducer';
import StarRating from '../Common/StarRating';

const BestSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bestSeller, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBestSellerBooks());
    }, [dispatch]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500 text-xl font-medium">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Bestselling Books
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Discover our most popular titles
                    </p>
                </div>

                {bestSeller && (
                    <div className="flex justify-center">
                        <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden w-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="relative">
                                <img
                                    className="w-full h-64 object-cover"
                                    src={bestSeller.image}
                                    alt={bestSeller.title}
                                />
                                <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
                                    BESTSELLER
                                </div>
                                <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-bl-lg font-bold text-gray-900">
                                    ${bestSeller.price.toFixed(2)}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center mb-2">
                                    <StarRating rating={bestSeller.rating} size={20} />
                                    <span className="ml-2 text-gray-600 text-sm">
                                        ({bestSeller.numReviews} reviews)
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1">{bestSeller.title}</h3>
                                <p className="text-gray-600 italic mb-4">by {bestSeller.author}</p>

                                <p className="text-gray-700 mb-6 line-clamp-2">{bestSeller.description}</p>

                                <div className="flex space-x-4">
                                    <button
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => navigate(`/books/${bestSeller._id}`)}
                                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestSeller;