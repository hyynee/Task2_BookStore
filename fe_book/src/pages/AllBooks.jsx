import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Filter from '../components/Books/Filter';
import StarRating from '../components/Common/StarRating';
import { fetchBooksByFilters } from '../redux/Reducer/bookReducer';

const AllBooks = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openFilter, setOpenFilter] = useState(false);
    // Khởi tạo filters từ searchParams
    const [filters, setFilters] = useState({
        author: searchParams.get('author') || '',
        minPrice: searchParams.get('minPrice') || undefined,
        maxPrice: searchParams.get('maxPrice') || undefined,
        minReviews: searchParams.get('minReviews') || undefined,
        sortBy: searchParams.get('sortBy') || '',
        order: searchParams.get('order') || 'asc',
        page: Number(searchParams.get('page')) || 1,
        limit: Number(searchParams.get('limit')) || 10,
        accessPublic: searchParams.get('accessPublic') === 'false' ? false : true,
    });
    const { books, loading, error } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        // Cập nhật URL và gọi API khi filters thay đổi
        const queryParams = {};
        if (filters.author) queryParams.author = filters.author;
        if (filters.minPrice) queryParams.minPrice = filters.minPrice;
        if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
        if (filters.minReviews) queryParams.minReviews = filters.minReviews;
        if (filters.sortBy) queryParams.sortBy = filters.sortBy;
        if (filters.order) queryParams.order = filters.order;
        if (filters.page) queryParams.page = filters.page;
        if (filters.limit) queryParams.limit = filters.limit;
        if (filters.accessPublic !== undefined) queryParams.accessPublic = filters.accessPublic;

        setSearchParams(queryParams); // Cập nhật URL
        fetchBooksWithFilters();
    }, [filters]);

    const fetchBooksWithFilters = () => {
        console.log('Fetching with filters:', filters);
        dispatch(fetchBooksByFilters(filters));
    };

    const handleFilterChange = (type, value, checked) => {
        console.log(`${type} filter changed: ${value} is ${checked ? 'selected' : 'deselected'}`);
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            switch (type) {
                case 'author':
                    newFilters.author = checked ? value : '';
                    break;
                case 'priceRange':
                    if (checked) {
                        const [min, max] = value.replace(/\$/g, '').split(' - ');
                        if (max === 'and above') {
                            newFilters.minPrice = min;
                            newFilters.maxPrice = undefined;
                        } else {
                            newFilters.minPrice = min;
                            newFilters.maxPrice = max;
                        }
                    } else {
                        newFilters.minPrice = undefined;
                        newFilters.maxPrice = undefined;
                    }
                    break;
                case 'minReviews':
                    newFilters.minReviews = checked ? value : undefined;
                    break;
                case 'sort':
                    if (value === 'Price: Low to High') {
                        newFilters.sortBy = 'priceAsc';
                    } else if (value === 'Price: High to Low') {
                        newFilters.sortBy = 'priceDesc';
                    } else if (value === 'Popularity') {
                        newFilters.sortBy = 'popularity';
                    } else {
                        newFilters.sortBy = '';
                    }
                    break;
                default:
                    break;
            }
            newFilters.page = 1;
            return newFilters;
        });
    };

    const handleLoadMore = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: prevFilters.page + 1,
        }));
    };

    const clearFilters = () => {
        setFilters({
            author: '',
            minPrice: undefined,
            maxPrice: undefined,
            minReviews: undefined,
            sortBy: '',
            order: 'asc',
            page: 1,
            limit: 10,
            accessPublic: true,
        });
    };

    const authors = ['Sun Tzu', 'George Orwell', 'Harper Lee', 'F. Scott Fitzgerald'];
    const priceRanges = ['$0 - $10', '$11 - $20', '$21 - $30', '$31 and above'];
    const minReviewsOptions = [10, 50, 100, 500];
    const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Popularity'];

    if (loading && filters.page === 1) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="flex-1">
                <div className="flex flex-col items-start text-left">
                    <h1 className="font-bold text-4xl md:text-[40px]">Books</h1>
                    <p className="text-sm md:text-base text-gray-500/90 mt-2">
                        Explore our collection of bestselling books and timeless classics.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Found {books.length} books
                    </p>
                </div>

                {books.length > 0 ? (
                    <>
                        {books.map((book) => (
                            <div
                                className="mt-8 flex flex-col md:flex-row items-start gap-6 py-10 border-b border-gray-300 last:pb-30 last:border-0 md:gap-8"
                                key={book._id}
                            >
                                <img
                                    src={book.image || 'https://via.placeholder.com/150'}
                                    alt="book-img"
                                    title="View Book Details"
                                    className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                                    onClick={() => {
                                        navigate(`/books/${book._id}`);
                                        scrollTo(0, 0);
                                    }}
                                />
                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-800 text-3xl font-semibold cursor-pointer">
                                        {book.title}
                                    </p>
                                    <StarRating rating={book.rating || 0} size={20} />
                                    <p className="text-gray-600 text-sm">by {book.author}</p>
                                    <p className="text-gray-500 mt-2 text-sm">{book.description}</p>
                                    {book.numReviews && (
                                        <p className="text-gray-400 text-xs">
                                            {book.numReviews} reviews
                                        </p>
                                    )}
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="text-gray-800 text-xl font-semibold">
                                            ${book.price}
                                        </span>
                                        <button
                                            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors"
                                            onClick={() => { console.log(`Added ${book._id} to cart`) }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {books.length >= filters.limit && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center mt-8">
                        <p className="text-gray-500">No books found matching your criteria.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-blue-500 hover:text-blue-700 underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
            <Filter
                authors={authors}
                priceRanges={priceRanges}
                minReviewsOptions={minReviewsOptions}
                sortOptions={sortOptions}
                onFilterChange={handleFilterChange}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                onClearFilters={clearFilters}
                currentFilters={filters}
            />
        </div>
    );
};

export default AllBooks;