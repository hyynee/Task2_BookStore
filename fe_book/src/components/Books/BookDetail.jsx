import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchBookDetail, fetchSimilarBooks } from '../../redux/Reducer/bookReducer';
import { addToCart } from '../../redux/Reducer/cartReducer';
import BookGrid from './BookGrid';
const BookDetail = ({ bookId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBook, loading, error, similarBooks } = useSelector((state) => state.books);
  const { user, guestId } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const bookFetchId = bookId || id;

  useEffect(() => {
    if (bookFetchId) {
      dispatch(fetchBookDetail(bookFetchId));
      dispatch(fetchSimilarBooks({ id: bookFetchId }));
    }
  }, [dispatch, bookFetchId]);

  const handleQuantityChange = (type) => {
    if (type === 'plus') setQuantity((prev) => prev + 1);
    if (type === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        userId: user?._id,
        guestId,
        bookId: bookFetchId,
        quantity,
      })
    )
      .then(() => {
        toast.success('Book added to cart.', { duration: 1000 });
      })
      .catch((err) => {
        toast.error('Failed to add to cart: ' + err, { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedBook) return <p className="text-center">No book found.</p>;

  return (
    <div className="container mx-auto px-8 py-20">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900"
      >
        Back to Books
      </button>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Book Image */}
          <div>
            <img
              src={selectedBook?.image}
              alt={selectedBook?.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {selectedBook.title || 'Default Book Title'}
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              by {selectedBook.author}
            </p>
            <p className="text-xl text-green-600 font-semibold mb-4">
              ${selectedBook.price}
            </p>
            <p className="text-gray-700 mb-6">
              {selectedBook.description}
            </p>

            {/* Rating */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < selectedBook.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({selectedBook.numReviews} reviews)
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center space-x-4">
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                  onClick={() => handleQuantityChange('minus')}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                  onClick={() => handleQuantityChange('plus')}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-3 bg-blue-500 text-white rounded-lg font-medium ${isButtonDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600'
                } transition-colors`}
            >
              {isButtonDisabled ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* Book Details */}
            <div className="mt-10 text-gray-800">
              <h3 className="text-xl font-bold mb-4">Book Details:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Author:</td>
                    <td className="py-1">{selectedBook.author}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Rating:</td>
                    <td className="py-1">{selectedBook.rating}/5</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Reviews:</td>
                    <td className="py-1">{selectedBook.numReviews}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Published:</td>
                    <td className="py-1">
                      {selectedBook.isPublished ? 'Yes' : 'No'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Published Date:</td>
                    <td className="py-1">
                      {new Date(selectedBook.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Books */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <BookGrid books={similarBooks} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;