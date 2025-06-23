import React, { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import { publicApi } from '../../utils/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await publicApi.getTeamMembers();
        setTeamMembers(response.data || []);
        setTeamLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setTeamError('Failed to load team members. Please try again later.');
        setTeamLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await publicApi.getAbout();
        setAboutData(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load company information. Please try again later.');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

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

  if (!aboutData) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <Container>
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Information Available</h2>
            <p className="text-gray-600">Company information is currently unavailable.</p>
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
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left Column - Content */}
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                  <span>About Our Company</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {aboutData.title}
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  {aboutData.content}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors">
                    Contact Us
                  </button>
                  <button className="px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

            
              {/* Right Column - Image */}
              <div className="md:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Team collaboration"
                    className="w-full h-auto rounded-2xl"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                </div>
                {/* Stats */}
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4">
              Our Mission & Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Driving Innovation Forward
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're committed to delivering exceptional solutions that transform businesses and create lasting impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="p-8 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary dark:text-primary-light inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  To deliver innovative and reliable technology solutions that empower businesses to thrive in the digital age.
                </p>
                <a href="#mission" className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:underline mt-auto group">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </Card>

            {/* Vision */}
            <Card className="p-8 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary dark:text-primary-light inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  To be the leading provider of digital transformation solutions, recognized for our commitment to excellence and customer success.
                </p>
                <a href="#vision" className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:underline mt-auto group">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </Card>
          </div>
        </Container>
      </section>

     
      {/* Company Image */}
      {aboutData?.image_url && (
        <section className="mb-16">
          <Container>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={aboutData.image_url} 
                alt={aboutData.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Values & Culture */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Values & Culture
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide our decisions and shape our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collaboration */}
            <Card className="group p-8 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  We believe in the power of teamwork and open communication to deliver exceptional results for our clients.
                </p>
                <a href="#collaboration" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-1">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </Card>

            {/* Integrity */}
            <Card className="group p-8 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integrity</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  We operate with honesty, transparency, and the highest ethical standards in everything we do.
                </p>
                <a href="#integrity" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-1">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </Card>

            {/* Innovation */}
            <Card className="group p-8 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 16V8m0 0l-3 3m3-3l3 3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  We embrace change and continuously explore new ideas to deliver cutting-edge solutions.
                </p>
                <a href="#innovation" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-1">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </Card>
          </div>

      </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's work together to create something amazing. Our team is ready to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About; 