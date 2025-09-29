import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const MyProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        navigate('/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setLogoutLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Same geometric background as other auth pages */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-96 h-48 bg-cyan-200"></div>
            <div className="absolute top-0 right-0 w-96 h-48 bg-teal-500"></div>
            <div className="absolute top-48 left-0 w-80 h-40 bg-teal-600"></div>
            <div className="absolute top-48 right-0 w-80 h-40 bg-cyan-300"></div>
            <div className="absolute bottom-0 left-0 w-96 h-48 bg-cyan-300"></div>
            <div className="absolute bottom-0 right-0 w-96 h-48 bg-teal-600"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-400"></div>
            <div className="absolute top-3/4 right-1/4 w-40 h-24 bg-cyan-400"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-48 bg-gray-100"></div>
            <div className="absolute top-1/3 right-1/3 w-48 h-24 bg-gray-200"></div>
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-teal-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">{error}</div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Same geometric background as other auth pages */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-48 bg-cyan-200"></div>
          <div className="absolute top-0 right-0 w-96 h-48 bg-teal-500"></div>
          <div className="absolute top-48 left-0 w-80 h-40 bg-teal-600"></div>
          <div className="absolute top-48 right-0 w-80 h-40 bg-cyan-300"></div>
          <div className="absolute bottom-0 left-0 w-96 h-48 bg-cyan-300"></div>
          <div className="absolute bottom-0 right-0 w-96 h-48 bg-teal-600"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-400"></div>
          <div className="absolute top-3/4 right-1/4 w-40 h-24 bg-cyan-400"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-48 bg-gray-100"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-24 bg-gray-200"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500 rounded-full text-white text-3xl font-bold mb-6 shadow-xl">
              <span>CS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              My Profile
            </h1>
            <p className="text-gray-600 text-lg">Manage your account information and settings</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-teal-600">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                
                {/* User Info */}
                <div className="text-center md:text-left text-white">
                  <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
                  <p className="text-teal-100 text-lg mb-2">{user?.email}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                    <ShieldCheckIcon className="w-4 h-4 mr-1" />
                    {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <UserIcon className="w-6 h-6 mr-2 text-teal-600" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
                      <p className="text-gray-800 font-medium">{user?.name}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
                      <p className="text-gray-800 font-medium flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {user?.email}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">User ID</label>
                      <p className="text-gray-800 font-mono text-sm">{user?.id}</p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <CogIcon className="w-6 h-6 mr-2 text-teal-600" />
                    Account Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">Account Role</label>
                      <div className="flex items-center">
                        <ShieldCheckIcon className="w-4 h-4 mr-2 text-teal-500" />
                        <span className="text-gray-800 font-medium capitalize">{user?.role}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">Account Status</label>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-800 font-medium">Active</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">Member Since</label>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-800 font-medium">
                          {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button - Only Logout */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-center">
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className={`inline-flex items-center px-8 py-3 font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      logoutLoading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
                    }`}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    {logoutLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
