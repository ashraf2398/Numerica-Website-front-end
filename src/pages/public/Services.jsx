import React, { useState, useEffect } from 'react';
import { publicApi } from '../../utils/api';
import ServicesSection from '../../components/services/ServicesSection';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await publicApi.getCategories();
        setCategories([{ id: 'all', name: 'All Services' }, ...response.data]);
      } catch (err) {
        console.warn('Using mock categories data. Backend endpoint not available:', err);
        // Mock categories for development
        const mockCategories = [
          { id: '1', name: 'Web Development' },
          { id: '2', name: 'Mobile Apps' },
          { id: '3', name: 'UI/UX Design' },
          { id: '4', name: 'Cloud Services' },
          { id: '5', name: 'IT Consulting' }
        ];
        setCategories([{ id: 'all', name: 'All Services' }, ...mockCategories]);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // The ServicesSection will handle its own loading state
  };
  
  const handleLoadingStateChange = (isLoading) => {
    setIsFiltering(isLoading);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            Our Services
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Financial Solutions</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tailored financial and accounting services designed to help your business thrive in today's competitive landscape.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
              {isCategoriesLoading ? (
                <div className="flex items-center justify-center w-full py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isFiltering}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center min-w-[100px] ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-md scale-105'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    } ${isFiltering ? 'opacity-75 cursor-wait' : 'cursor-pointer'}`}
                  >
                    {isFiltering && selectedCategory === category.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      category.name
                    )}
                  </button>
                ))
              )}
          </div>
        </div>
      </div>

      {/* Services Section with Category Filter */}
      <ServicesSection 
        limit={0} 
        showTitle={false} 
        showCta={false} 
        categoryId={selectedCategory !== 'all' ? selectedCategory : null}
        onLoadingStateChange={handleLoadingStateChange}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's work together to create something amazing. Our team is ready to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors">
              Get Started
            </a>
            <a href="/contact" className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;