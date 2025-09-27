import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Logo Circle */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-teal-600 font-bold text-lg">CS</span>
              </div>
              {/* Brand Name */}
              <span className="text-white font-semibold text-lg hidden sm:block">
                Career Setu
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-white text-teal-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                Home
              </Link>
              <Link
                to="/info"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/info')
                    ? 'bg-white text-teal-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                Info
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:bg-white/20 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-teal-500/90 backdrop-blur-sm">
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-6 py-3 rounded-full text-center text-sm font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-white text-teal-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Home
            </Link>
            <Link
              to="/info"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-6 py-3 rounded-full text-center text-sm font-medium transition-all duration-300 ${
                isActive('/info')
                  ? 'bg-white text-teal-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Info
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
