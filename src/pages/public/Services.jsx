import React, { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { publicApi } from '../../utils/api';

// Service icon mapping
const getServiceIcon = (iconName) => {
  const icons = {
    'finance-icon': (
      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'accounting-icon': (
      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'tax-icon': (
      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    ),
    'audit-icon': (
      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    'default': (
      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  return icons[iconName] || icons['default'];
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await publicApi.getServices();
        const servicesData = response.data;
        
        // Extract unique categories and create a mapping
        const uniqueCategories = {};
        servicesData.forEach(service => {
          if (service.categories && service.categories.id) {
            uniqueCategories[service.categories.id] = service.categories.name;
          }
        });
        
        setServices(servicesData);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services information. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services by category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category_id === parseInt(activeCategory));

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <Container>
          <Card className="p-8 text-center">
            <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
          </Card>
        </Container>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <Container>
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Services Available</h2>
            <p className="text-gray-600">Services information is currently unavailable.</p>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16 mb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl leading-relaxed">
              Comprehensive financial and accounting solutions tailored to your business needs.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      {Object.keys(categories).length > 0 && (
        <section className="mb-12">
          <Container>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Services
              </button>
              
              {Object.entries(categories).map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Services List */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="h-full flex flex-col">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-auto">
                    <a href={`#service-${service.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                      Learn more
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gray-50 py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Contact our team today to discuss how our services can benefit your business.
            </p>
            <Button variant="primary" size="lg">
              Request a Consultation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Services; 