import React from 'react'
import { Link } from 'react-router-dom'
const ProductGrid = ({ books, loading, error }) => {
    if (loading) {
        return <p>Loading...</p>
    };
    if (error) {
        return <p>Error: {error}</p>
    }
    if (!books || books.length === 0) {
        return <p>No books available.</p>
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {books.map((book, index) => (
                <Link key={index} to={`/books/${book._id}`} className='block'>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="w-full h-96 mb-4">
                            <img
                                src={book?.image}
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h3 className='text-sm mb-2'>{book.title}</h3>
                        <p className='text-gray-700 font-medium text-sm tracking-tighter'>
                            {book.price.toLocaleString("en-US")} $
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid