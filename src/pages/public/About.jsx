import React, { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import { publicApi } from '../../utils/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="pt-32 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16 mb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{aboutData.title}</h1>
            <p className="text-xl leading-relaxed">{aboutData.content}</p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="mb-4 text-primary">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 flex-grow">{aboutData.mission}</p>
              </div>
            </Card>

            {/* Vision */}
            <Card className="p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="mb-4 text-primary">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 flex-grow">{aboutData.vision}</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Company Image */}
      {aboutData.image_url && (
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
      <section>
        <Container>
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Values & Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaboration</h3>
                <p className="text-gray-600">We work together to achieve exceptional results for our clients.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Integrity</h3>
                <p className="text-gray-600">We uphold the highest standards of honesty and ethical conduct.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">We continuously seek new and better ways to serve our clients.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About; 