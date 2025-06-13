import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const displayBook = {
        ...book,
        author: book?.author,
        price: book?.price,
        image: book?.image
    };

    return (
        <Link
            to={`/books/${displayBook._id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
            onClick={() => scrollTo(0, 0)}
            key={displayBook.id}
        >
            <div className="relative">
                <img
                    src={displayBook.image}
                    alt={displayBook.title}
                    className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {displayBook.price}
                </div>
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{displayBook.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {displayBook.author}</p>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors mt-auto"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/books/${displayBook._id}`);
                        scrollTo(0, 0);
                    }}
                >
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default BookCard;