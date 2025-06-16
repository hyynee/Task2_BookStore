import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Title from '../components/Books/Title.jsx';
import { registerUser } from '../redux/Reducer/authReducer.jsx';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const frm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(4, 'Password must be at least 4 characters long').required('Password is required'),
      phone: yup.string().required('Phone number is required'),
      address: yup.string().required('Address is required')
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        await dispatch(registerUser(values)).unwrap();
        navigate('/');
      } catch (error) {
        console.log('Caught error in onSubmit:', error);
        if (error && typeof error === 'object' && 'message' in error) {
          if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
            setError(error.errors.map(err => `${err.field}: ${err.message}`).join(', '));
          } else {
            setError(error.message || 'Registration failed. Please try again.');
          }
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white py-30 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 space-y-8 transform transition-all duration-300 hover:shadow-xl">
        {/* Title */}
        <Title
          className="font-bold text-center text-3xl sm:text-4xl text-gray-800"
          title="Create Account"
          subtitle="Join BookHaven today"
        />

        {/* Hiển thị lỗi từ backend */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={frm.handleSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className={`mt-1 w-full px-4 py-3 bg-gray-50 border ${frm.errors.name && frm.touched.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.name}
            />
            {frm.errors.name && frm.touched.name && (
              <p className="mt-1 text-sm text-red-600">{frm.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`mt-1 w-full px-4 py-3 bg-gray-50 border ${frm.errors.email && frm.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.email}
            />
            {frm.errors.email && frm.touched.email && (
              <p className="mt-1 text-sm text-red-600">{frm.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`mt-1 w-full px-4 py-3 bg-gray-50 border ${frm.errors.password && frm.touched.password ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.password}
            />
            {frm.errors.password && frm.touched.password && (
              <p className="mt-1 text-sm text-red-600">{frm.errors.password}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className={`mt-1 w-full px-4 py-3 bg-gray-50 border ${frm.errors.phone && frm.touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.phone}
            />
            {frm.errors.phone && frm.touched.phone && (
              <p className="mt-1 text-sm text-red-600">{frm.errors.phone}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className={`mt-1 w-full px-4 py-3 bg-gray-50 border ${frm.errors.address && frm.touched.address ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.address}
            />
            {frm.errors.address && frm.touched.address && (
              <p className="mt-1 text-sm text-red-600">{frm.errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            disabled={frm.isSubmitting}
          >
            {frm.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-all duration-200"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;