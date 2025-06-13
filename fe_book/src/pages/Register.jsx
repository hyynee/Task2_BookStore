import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Title from '../components/Books/Title.jsx';
const Register = () => {
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
      phone: '',
      address: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(4, 'Password must be at least 4 characters long').required('Password is required'),
      phone: yup.string().required('Phone number is required'),
      address: yup.string().required('Address is required')
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle registration logic here, e.g., API call
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

        {/* Form */}
        <form className="space-y-6" onSubmit={frm.handleSubmit}>
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
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={frm.handleChange}
              value={frm.values.email}
              required
            />
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
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={frm.handleChange}
              value={frm.values.password}
              required
            />
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
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={frm.handleChange}
              value={frm.values.phone}
              required
            />
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
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={frm.handleChange}
              value={frm.values.address}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Sign Up
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