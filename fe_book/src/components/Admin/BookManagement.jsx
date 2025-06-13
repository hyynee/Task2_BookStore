import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBook, fetchAdminBooks } from '../../redux/Reducer/adminBookReducer';

const BookManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books, loading, error } = useSelector((state) => state.adminBooks);

    useEffect(() => {
        dispatch(fetchAdminBooks());
    }, [dispatch, navigate]);

    const handleDeleteBook = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBook(id))
                .unwrap()
                .then(() => {
                    toast.success('Book deleted successfully!');
                })
                .catch((err) => {
                    toast.error('Failed to delete book: ' + err);
                });
        }
    };

    const handleRefreshBooks = () => {
        dispatch(fetchAdminBooks());
        toast.info('Refreshing book list...');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-semibold text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-semibold text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
                <div className="flex space-x-4">
                    <Link
                        to="/admin/products/create"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium"
                    >
                        Add New Book
                    </Link>
                    <button
                        onClick={handleRefreshBooks}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
                    >
                        Refresh List
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-900">
                        <tr>
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Author</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm">{book._id}</td>
                                    <td className="py-3 px-4">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-12 h-12 object-cover rounded"
                                            onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')} // Placeholder if image fails
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-sm">{book.title}</td>
                                    <td className="py-3 px-4 text-sm">{book.author}</td>
                                    <td className="py-3 px-4 text-sm">
                                        {book.price ?
                                            book.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                            : '$0.00'}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${book.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {book.isPublished ? 'Published' : 'Unpublished'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <Link
                                            to={`/admin/books/${book._id}/edit`}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteBook(book._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-600">
                                    No books found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookManagement;