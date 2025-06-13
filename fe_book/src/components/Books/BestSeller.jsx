import React from 'react';

const BestSeller = () => {
    // Mock bestseller book data
    const bestSellers = [
        {
            id: 1,
            title: 'Atomic Habits',
            author: 'James Clear',
            price: '$16.99',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            title: 'The Subtle Art of Not Giving a F*ck',
            author: 'Mark Manson',
            price: '$14.99',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            title: 'Becoming',
            author: 'Michelle Obama',
            price: '$18.99',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            title: 'Educated',
            author: 'Tara Westover',
            price: '$15.99',
            image: 'https://via.placeholder.com/150',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-center mb-8">Bestselling Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestSellers.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
                    >
                        <div className="relative">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                                {book.price}
                            </div>
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors mt-auto"
                                onClick={() => alert(`Added ${book.title} to cart!`)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSeller;