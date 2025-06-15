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
    <div className="pt-32 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16 mb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl leading-relaxed">
              Have questions or need assistance? Our team is here to help you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="mb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              
              {/* Addresses */}
              {contactData.addresses && contactData.addresses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Offices</h3>
                  <ul className="space-y-4">
                    {contactData.addresses.map((address, index) => (
                      <li key={index} className="flex">
                        <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-600">{address}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Phone Numbers */}
              {contactData.phones && contactData.phones.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Phone Numbers</h3>
                  <ul className="space-y-2">
                    {contactData.phones.map((phone, index) => (
                      <li key={index} className="flex">
                        <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${phone}`} className="text-gray-600 hover:text-primary">
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Email Addresses */}
              {contactData.emails && contactData.emails.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Email Addresses</h3>
                  <ul className="space-y-2">
                    {contactData.emails.map((email, index) => (
                      <li key={index} className="flex">
                        <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${email}`} className="text-gray-600 hover:text-primary">
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Request a Consultation</h2>
                
                {formSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                    <div className="flex">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-700">Thank you! Your consultation request has been sent successfully.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {formError && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                        <div className="flex">
                          <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-red-700">{formError}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name" className="label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone" className="label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="preferred_date" className="label">Preferred Consultation Date & Time</label>
                      <input
                        type="datetime-local"
                        id="preferred_date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message" className="label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="input h-32 resize-none"
                        placeholder="Please describe what you need help with"
                      ></textarea>
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={formSubmitting}
                    >
                      {formSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        'Request Consultation'
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Map Section */}
      <section>
        <Container>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            {mapError ? (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-6">
                <div className="text-center mb-6">
                  <svg className="h-16 w-16 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Google Maps Preview Unavailable</h3>
                  <p className="text-gray-600 mb-4">The interactive map cannot be displayed in local development environment.</p>
                  <a 
                    href="https://maps.google.com/?q=The+GrEEK+Campus+Downtown,+Cairo,+Egypt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    View on Google Maps
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="w-full max-w-md">
                  <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=The+GrEEK+Campus+Downtown,Cairo,Egypt&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7CThe+GrEEK+Campus+Downtown,Cairo,Egypt&key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik"
                    alt="Static map of The GrEEK Campus Downtown, Cairo, Egypt"
                    className="w-full rounded-md shadow"
                  />
                </div>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7279072032684!2d31.236339976112735!3d30.044663018559305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c792ff5ed5%3A0x27392189a2c25351!2sThe%20GrEEK%20Campus%20Downtown!5e0!3m2!1sen!2seg!4v1749560604067!5m2!1sen!2seg"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Numerica office location"
              ></iframe>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact; 