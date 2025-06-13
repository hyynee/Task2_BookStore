import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNewArrivalBooks } from '../../redux/Reducer/bookReducer';
import BookCard from './BookCard';
import Title from './Title';

const FeaturedBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newArrivals, loading, error } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(fetchNewArrivalBooks());
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }
  return (
    <div className="container-fluid mx-auto px-4 py-20">
      <Title title="Featured Books" subtitle="Discover the best books for your next adventure in Vietnam" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {newArrivals.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate('/books');
            scrollTo(0, 0);
          }}
          className="my-4 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900"
        >
          View All Books
        </button>
      </div>
    </div>
  );
};

export default FeaturedBook;