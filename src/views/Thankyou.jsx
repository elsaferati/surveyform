// src/views/Thankyou.jsx
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircleIcon } from '@heroicons/react/solid'; // or any icon set

export default function Thankyou() {
  // track window size for confetti
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🎉 Confetti */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={200}
      />

      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl p-8 text-center max-w-lg mx-auto">
          {/* Icon */}
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully.
          </p>

          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
