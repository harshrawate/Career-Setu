import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  PaperClipIcon, 
  BuildingLibraryIcon,
  BeakerIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Handle card click navigation
  const handleCardClick = (path) => {
    navigate(path);
  };

  const careerCards = [
    {
      id: 1,
      title: 'Entrance Exams',
      icon: BookOpenIcon,
      description: 'Comprehensive guides and practice tests for all major entrance examinations',
      color: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      path: '/entrance-exams'  // ✅ Added navigation path
    },
    {
      id: 2,
      title: 'Parents Guide',
      icon: UserGroupIcon,
      description: 'Essential resources and tips for parents to support their child\'s career journey',
      color: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      path: '/parents-guide'  // ✅ Added navigation path
    },
    {
      id: 3,
      title: 'Study Material',
      icon: PaperClipIcon,
      description: 'High-quality study resources, notes, and materials for effective learning',
      color: 'from-green-500 to-teal-500',
      bgPattern: 'bg-gradient-to-br from-green-50 to-teal-50',
      iconColor: 'text-green-600',
      path: '/study-material'  // ✅ Added navigation path
    },
    {
      id: 4,
      title: 'College Explorer',
      icon: BuildingLibraryIcon,
      description: 'Discover and compare colleges, universities, and educational institutions',
      color: 'from-orange-500 to-red-500',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      path: '/college-explorer'  // ✅ Added navigation path
    },
    {
      id: 5,
      title: 'Aptitude Test',
      icon: BeakerIcon,
      description: 'Assess your skills and abilities with comprehensive aptitude evaluations',
      color: 'from-indigo-500 to-blue-500',
      bgPattern: 'bg-gradient-to-br from-indigo-50 to-blue-50',
      iconColor: 'text-indigo-600',
      path: '/aptitude-test'  // ✅ Added navigation path
    },
    {
      id: 6,
      title: 'Information',
      icon: InformationCircleIcon,
      description: 'Stay updated with the latest career trends, news, and important announcements',
      color: 'from-gray-500 to-slate-500',
      bgPattern: 'bg-gradient-to-br from-gray-50 to-slate-50',
      iconColor: 'text-gray-600',
      path: '/information'  // ✅ Added navigation path
    },
    {
      id: 7,
      title: 'Market Trends',
      icon: ArrowTrendingUpIcon,
      description: 'Analyze current job market trends and future career opportunities',
      color: 'from-emerald-500 to-green-500',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-green-50',
      iconColor: 'text-emerald-600',
      path: '/market-trends'  // ✅ Added navigation path
    },
    {
      id: 8,
      title: 'Learning Games',
      icon: PuzzlePieceIcon,
      description: 'Interactive educational games to make learning fun and engaging',
      color: 'from-yellow-500 to-orange-500',
      bgPattern: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      iconColor: 'text-yellow-600',
      path: '/learning-games'  // ✅ Added navigation path
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-3xl font-bold mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <SparklesIcon className="w-10 h-10" />
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Journey Starts Here
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need is here. Just explore to get the precise information 
            regarding all the things about your <span className="font-semibold text-teal-600">Career Journey</span>
          </p>
          
          {/* Decorative Line */}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {careerCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative ${card.bgPattern} backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.path)}  // ✅ Added navigation on click
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${card.iconColor} bg-white rounded-xl shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <card.icon className="w-8 h-8" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {card.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-sm font-medium text-teal-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Corner Decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-20">
          <button
            onClick={() => navigate('/get-started')}  // ✅ Added navigation for CTA button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <AcademicCapIcon className="w-5 h-5 mr-2" />
            Get Started Today
            <ChartBarIcon className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: '10K+', label: 'Students Guided', icon: AcademicCapIcon },
            { number: '500+', label: 'Career Paths', icon: ChartBarIcon },
            { number: '95%', label: 'Success Rate', icon: ArrowTrendingUpIcon },
            { number: '24/7', label: 'Support', icon: LightBulbIcon }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <stat.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
