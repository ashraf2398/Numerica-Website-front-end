import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { publicApi } from '../../utils/api';

// Service icon mapping with support for all service icons from the API
const getServiceIcon = (iconName = '') => {
  const iconMappings = {
    'payroll-services-icon': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    'audit-assurance-icon': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'business-consulting-icon': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    'financial-planning-icon': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'business-accounting-icon': 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    'tax-preparation-icon': 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z',
    'default': 'M13 10V3L4 14h7v7l9-11h-7z'
  };

  const pathData = iconMappings[iconName] || iconMappings['default'];
  
  return (
    <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pathData} />
    </svg>
  );
};

const ServicesSection = ({ 
  limit = 3, 
  showTitle = true, 
  showCta = true, 
  categoryId = null, 
  onLoadingStateChange = () => {}
}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Notify parent component about loading state changes
  useEffect(() => {
    onLoadingStateChange(loading);
    
    // Auto-reset loading state after a short delay to prevent UI lock
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Safety timeout to prevent infinite loading
      
      return () => clearTimeout(timer);
    }
  }, [loading, onLoadingStateChange]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Always fetch all services and filter client-side
        const response = await publicApi.getServices();
        
        if (!isMounted) return;
        
        // Filter services by category on the client side if categoryId is provided
        let filteredServices = response.data;
        if (categoryId && categoryId !== 'all') {
          filteredServices = response.data.filter(service => 
            String(service.category_id) === String(categoryId) || 
            (service.category && String(service.category.id) === String(categoryId))
          );
        }
        
        // Apply limit if specified
        if (limit > 0) {
          filteredServices = filteredServices.slice(0, limit);
        }
        
        setServices(filteredServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add a small delay to show loading state for better UX
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [limit, categoryId]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading services...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No services available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group-hover:shadow-xl dark:group-hover:shadow-gray-800/50 overflow-hidden">
                <div className="p-6 pb-0">
                  <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 text-primary dark:text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>
                
                <div className="p-6 pt-4 flex flex-col h-full">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-800 bg-primary-100 dark:bg-primary-900/30 dark:text-primary-200 rounded-full">
                      {service.categories?.name || 'Service'}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                    {service.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                       
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    <a 
                      href={`/services#service-${service.id}`}
                      className="inline-flex items-center text-primary dark:text-primary-light font-medium group"
                    >
                      <span>Learn more</span>
                      <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {showCta && (
          <div className="text-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              View All Services
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
