import React from 'react';
import { useNavigate } from 'react-router-dom';
import caption from '../../assets/caption.jpg';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex flex-col items-center justify-center text-white min-h-screen py-20"
      style={{
        backgroundImage: `url(${caption})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-16 lg:px-24 xl:px-32 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
          Find the Book of Your Dreams
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8">
          Discover amazing hotels and experiences in Vietnam
        </p>
        <button
          onClick={() => navigate('/books')}
          className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
          Shop Now
        </button>
      </div>


    </div>
  );
};

export default Hero;