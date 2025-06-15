import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { updateBook } from '../../redux/Reducer/adminBookReducer';
import { fetchBookDetail } from '../../redux/Reducer/bookReducer';
import { http } from '../../utils/config';

const EditBookPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedBook, loading, error } = useSelector(state => state.books);
    const [uploading, setUploading] = React.useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchBookDetail(id));
        }
    }, [dispatch, id]);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            price: 0,
            image: '',
            description: '',
            isPublished: false,
            rating: 0,
            numReviews: 0,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .min(2, 'Title must be at least 2 characters')
                .required('Book title is required'),
            author: Yup.string()
                .min(2, 'Author must be at least 2 characters')
                .required('Author is required'),
            price: Yup.number()
                .min(1, 'Price must be greater than 0')
                .required('Price is required'),
            image: Yup.string()
                .url('Invalid image URL')
                .matches(/\.(png|jpg|jpeg|gif)$/i, 'Image must be in png, jpg, jpeg or gif format')
                .required('Image is required'),
            description: Yup.string()
                .min(10, 'Description must be at least 10 characters')
                .required('Description is required'),
            rating: Yup.number()
                .min(0, 'Rating cannot be negative')
                .max(5, 'Maximum rating is 5')
                .required('Rating is required'),
            numReviews: Yup.number()
                .min(0, 'Number of reviews cannot be negative')
                .required('Number of reviews is required'),
            isPublished: Yup.boolean(),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(updateBook({ id, bookData: values })).unwrap();
                toast.success('Book updated successfully!');
                navigate('/admin/products');
            } catch (error) {
                toast.error('Failed to update book: ' + (error || 'Unknown error'));
            }
        },
    });

    // Update form values when selectedBook changes
    useEffect(() => {
        if (selectedBook) {
            formik.setValues({
                title: selectedBook.title || '',
                author: selectedBook.author || '',
                price: selectedBook.price || 0,
                image: selectedBook.image || '',
                description: selectedBook.description || '',
                isPublished: selectedBook.isPublished || false,
                rating: selectedBook.rating || 0,
                numReviews: selectedBook.numReviews || 0,
            });
        }
    }, [selectedBook]);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.error('Please select an image file');
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image file is too large (max 5MB)');
            return;
        }

        // Check file format
        if (!file.type.match('image/(png|jpg|jpeg|gif)')) {
            toast.error('File must be in png, jpg, jpeg or gif format');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            const response = await http.post('/upload', formData);
            if (response.data.imageUrl) {
                formik.setFieldValue('image', response.data.imageUrl);
            } else {
                toast.error('Did not receive image URL from server');
            }
            setUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Image upload failed');
            setUploading(false);
        }
    };

    // Remove image
    const handleRemoveImage = () => {
        formik.setFieldValue('image', '');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-lg text-gray-600">Loading book details...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Book</h3>
                        <p className="mt-1 text-sm text-gray-500">{error}</p>
                        <div className="mt-6">
                            <Link
                                to="/admin/products"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Back to Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Edit Book</h2>
                        <p className="text-green-100 mt-1">Update the book details below</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Book Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter book title"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title || ''}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                                )}
                            </div>

                            {/* Author */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    placeholder="Enter author name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.author && formik.errors.author ? 'border-red-500' : 'border-gray-300'}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.author || ''}
                                />
                                {formik.touched.author && formik.errors.author && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.author}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price *
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="0.00"
                                        className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                {formik.touched.price && formik.errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
                                )}
                            </div>

                            {/* Rating */}
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating *
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    placeholder="0-5"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.rating && formik.errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.rating}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                                {formik.touched.rating && formik.errors.rating && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.rating}</p>
                                )}
                            </div>

                            {/* Number of Reviews */}
                            <div>
                                <label htmlFor="numReviews" className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of Reviews *
                                </label>
                                <input
                                    type="number"
                                    id="numReviews"
                                    name="numReviews"
                                    placeholder="Enter number of reviews"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.numReviews && formik.errors.numReviews ? 'border-red-500' : 'border-gray-300'}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numReviews}
                                    min="0"
                                />
                                {formik.touched.numReviews && formik.errors.numReviews && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.numReviews}</p>
                                )}
                            </div>

                            {/* Published Status */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    name="isPublished"
                                    checked={formik.values.isPublished}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                                    Publish this book
                                </label>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                Book Cover *
                            </label>
                            {formik.values.image ? (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={formik.values.image}
                                            alt="Book cover preview"
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                            onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                            title="Remove image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Current book cover</p>
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Change Image
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/png,image/jpg,image/jpeg,image/gif"
                                                onChange={handleImageUpload}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="image"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/png,image/jpg,image/jpeg,image/gif"
                                                    onChange={handleImageUpload}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                </div>
                            )}
                            {uploading && (
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading image...
                                </div>
                            )}
                            {formik.touched.image && formik.errors.image && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.image}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter detailed book description..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description || ''}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                            <Link
                                to="/admin/books"
                                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting || uploading}
                                className={`px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${(formik.isSubmitting || uploading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {formik.isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    'Update Book'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBookPage;