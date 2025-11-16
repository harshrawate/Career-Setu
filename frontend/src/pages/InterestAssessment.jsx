import React from 'react';

const InterestAssessment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 mb-6">
              Test your Interests!
            </h1>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Explore what truly drives you. This isn't just a test; it's a stepping 
              stone to understanding your passions and skills. By diving into these 
              questions, you'll uncover valuable insights that can help shape your 
              academic and career path, making sure your future is a true reflection 
              of your unique self.
            </p>
            
            <button className="bg-teal-300 hover:bg-teal-400 text-teal-900 font-medium 
                             px-8 py-3 rounded-full transition-all duration-300 
                             hover:shadow-lg transform hover:-translate-y-1">
              Start your Assessment
            </button>
          </div>
          
          {/* Right Illustration Section */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              {/* Background decorative circle */}
              <div className="absolute inset-0 bg-teal-200 rounded-full opacity-20 
                            transform scale-110"></div>
              
              {/* Main illustration container */}
              <div className="relative bg-gradient-to-br from-teal-300 to-teal-400 
                            rounded-full p-8 md:p-12">
                {/* Workspace illustration */}
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  {/* Window */}
                  <div className="flex justify-end mb-4">
                    <div className="w-24 h-32 bg-teal-100 rounded-full border-4 
                                  border-teal-200"></div>
                  </div>
                  
                  {/* Bookshelf */}
                  <div className="mb-6 space-y-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-12 bg-teal-500 rounded"></div>
                      <div className="w-3 h-12 bg-gray-300 rounded"></div>
                      <div className="w-3 h-12 bg-teal-400 rounded"></div>
                      <div className="w-8 h-6 bg-green-400 rounded mt-6"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Person at desk */}
                  <div className="flex items-end justify-center space-x-4">
                    {/* Laptop */}
                    <div className="w-20 h-12 bg-gray-700 rounded-t-lg relative">
                      <div className="w-16 h-10 bg-blue-100 absolute top-1 left-2 
                                    rounded"></div>
                    </div>
                    
                    {/* Person */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-teal-600 rounded-full mb-2"></div>
                      <div className="w-16 h-20 bg-teal-500 rounded-lg"></div>
                    </div>
                    
                    {/* Desk */}
                    <div className="w-32 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-8 bg-teal-300 
                            rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-teal-200 
                            rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestAssessment;
