import React, { useState, useEffect, useRef } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { publicApi } from '../../utils/api';

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await publicApi.getContactInfo();
        setContactData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact information. Please try again later.');
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Handle iframe loading or error
  useEffect(() => {
    const handleIframeLoad = () => {
      setMapLoaded(true);
    };

    const handleIframeError = () => {
      setMapError(true);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);

      // Check if iframe loaded correctly after a delay
      const timer = setTimeout(() => {
        try {
          // If we can't access the iframe document, it likely failed to load
          if (iframe.contentWindow.document) {
            // Successfully accessed iframe document
          }
        } catch (e) {
          // Cross-origin error means iframe loaded but content is blocked
          // This is normal and expected for Google Maps on localhost
          setMapError(true);
        }
      }, 1000);

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    try {
      // Send data to the consultations API endpoint
      await publicApi.submitConsultation(formData);
      
      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError('Failed to submit your message. Please try again later.');
    } finally {
      setFormSubmitting(false);
    }
  };

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

  if (!contactData) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <Container>
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Contact Information Available</h2>
            <p className="text-gray-600">Contact information is currently unavailable.</p>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary to-primary-dark text-white">
        <Container>
          <div className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                Get in Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Our Team</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have questions or need assistance? Our dedicated team is here to help you with all your financial needs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Reach out to us through any of these channels. Our team is ready to assist you with your financial needs.
              </p>
              
              {/* Addresses */}
              {contactData.addresses && contactData.addresses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 text-primary dark:text-primary-light mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Our Offices
                  </h3>
                  <ul className="space-y-4">
                    {contactData.addresses.map((address, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary dark:bg-primary-light mt-2"></div>
                        </div>
                        <p className="ml-3 text-gray-600 dark:text-gray-300">{address}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Phone Numbers */}
              {contactData.phones && contactData.phones.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 text-primary dark:text-primary-light mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Numbers
                  </h3>
                  <ul className="space-y-3">
                    {contactData.phones.map((phone, index) => (
                      <li key={index} className="flex items-center">
                        <a 
                          href={`tel:${phone}`} 
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary dark:bg-primary-light mr-3"></span>
                          <span>{phone}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Email Addresses */}
              {contactData.emails && contactData.emails.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 text-primary dark:text-primary-light mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Addresses
                  </h3>
                  <ul className="space-y-3">
                    {contactData.emails.map((email, index) => (
                      <li key={index} className="flex items-center">
                        <a 
                          href={`mailto:${email}`} 
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary dark:bg-primary-light mr-3"></span>
                          <span>{email}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            <div className="lg:pl-12">
              <Card className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Request a Free Consultation</h2>
                
                {formSuccess ? (
                  <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Thank you for your message!</h3>
                        <p className="text-green-700 dark:text-green-300 mt-1">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">{formError}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          id="preferred_date"
                          name="preferred_date"
                          value={formData.preferred_date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        How can we help you? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white resize-none"
                        placeholder="Tell us about your financial needs..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-3 text-base font-medium"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                      We'll never share your information. Read our{' '}
                      <a href="/privacy" className="text-primary dark:text-primary-light underline hover:no-underline">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Schedule a visit or drop by our office. We're here to help you with all your financial needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
            {!mapError ? (
              <div className="relative h-[500px] w-full">
                <iframe
                  ref={iframeRef}
                  title="Numerica Financial Group Location"
                  className="w-full h-full"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7279072032684!2d31.236339976112735!3d30.044663018559305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c792ff5ed5%3A0x27392189a2c25351!2sThe%20GrEEK%20Campus%20Downtown!5e0!3m2!1sen!2seg!4v1749560604067!5m2!1sen!2seg"
                  onLoad={() => setMapLoaded(true)}
                  onError={() => setMapError(true)}
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white dark:bg-gray-700 shadow-lg mb-4">
                        <svg className="h-6 w-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Loading Map...</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Please wait while we load the map</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 text-center">
                <div className="max-w-md">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-gray-700 shadow-lg mb-5">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Map Unavailable</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">We're having trouble loading the map. Please try refreshing the page or contact us directly for directions.</p>
                  <a 
                    href="https://www.google.com/maps?q=The+GrEEK+Campus+Downtown,+Cairo,+Egypt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-200"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}
            
            <div className="p-8 border-t border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-lg border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Visit Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">The GrEEK Campus Downtown<br />Cairo, Egypt</p>
                      <a 
                        href="https://www.google.com/maps?q=The+GrEEK+Campus+Downtown,+Cairo,+Egypt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors duration-200"
                      >
                        Get directions
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-lg border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Email Us</h3>
                      <a 
                        href="mailto:info@numerica.com" 
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                      >
                        info@numerica.com
                      </a>
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Response time: Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-lg border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Call Us</h3>
                      <a 
                        href="tel:+201234567890" 
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 text-lg font-medium"
                      >
                        +20 123 456 7890
                      </a>
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Sun-Thu, 9am-5pm EET
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact; 