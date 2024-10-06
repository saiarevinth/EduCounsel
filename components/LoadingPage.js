import React from 'react';
import '../styles/globals.css';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="spinner"></div>
        <p className="mt-6 text-2xl font-semibold text-yellow-400">
          Loading
        </p>
        <p className="mt-2 text-lg text-yellow-400">
          Please wait. This might take a few seconds.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
