import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { publicApi } from '../../utils/api';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FadeInSection from '../../components/ui/FadeInSection';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import ServicesSection from '../../components/services/ServicesSection';

const Home = () => {
  // Stats data
  const stats = [
    { id: 1, value: '500+', label: 'Clients Served' },
    { id: 2, value: '25+', label: 'Years Experience' },
    { id: 3, value: '100%', label: 'Client Satisfaction' },
    { id: 4, value: '35', label: 'Expert Accountants' }
  ];

  // State for testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(null);

  // State for home banners
  const [banners, setBanners] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(true);
  const [bannersError, setBannersError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const currentBanner = banners[currentBannerIndex] || {};

  // State for trusted companies
  const [trustedCompanies, setTrustedCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [companiesError, setCompaniesError] = useState(null);

  // Fetch home banners
  const fetchBanners = async () => {
    try {
      const response = await publicApi.getHomeBanners();
      setBanners(response.data || []);
      setBannersLoading(false);
    } catch (err) {
      console.error('Error fetching home banners:', err);
      setBannersError('Failed to load banners. Please try again later.');
      setBannersLoading(false);
    }
  };

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await publicApi.getTestimonials();
      setTestimonials(response.data || []);
      setTestimonialsLoading(false);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setTestimonialsError('Failed to load testimonials. Please try again later.');
      setTestimonialsLoading(false);
    }
  };

  // Fetch trusted companies
  const fetchTrustedCompanies = async () => {
    try {
      const response = await publicApi.getTrustedCompanies();
      setTrustedCompanies(response.data || []);
      setCompaniesLoading(false);
    } catch (err) {
      console.error('Error fetching trusted companies:', err);
      setCompaniesError('Failed to load trusted companies.');
      setCompaniesLoading(false);
    }
  };

  // Handle manual banner navigation
  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  // Initial data fetching
  useEffect(() => {
    // Auto-rotate banners
    const bannerInterval = setInterval(() => {
      if (banners.length > 1) {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 8000);

    // Fetch all initial data
    const fetchInitialData = async () => {
      await Promise.all([
        fetchTestimonials(),
        fetchTrustedCompanies(),
        fetchBanners()
      ]);
    };

    fetchInitialData();

    return () => clearInterval(bannerInterval);
  }, [banners.length]);



  // Get the current theme
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Hero Section with Banner Carousel */}
      <section className={`relative min-h-screen flex items-center overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-primary-900 to-primary-800'
      }`}>
        {bannersLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : bannersError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/80">{bannersError}</p>
          </div>
        ) : banners.length > 0 ? (
          <>
            {/* Banner Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${currentBanner.image_url})`,
                opacity: 0.15
              }}
            ></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl animate-float"></div>
              <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 ${
                isDarkMode ? 'bg-primary-600' : 'bg-primary-400'
              } rounded-full mix-blend-overlay blur-3xl animate-float animation-delay-2000`}></div>
              <div className={`absolute top-1/2 right-1/3 w-80 h-80 ${
                isDarkMode ? 'bg-primary-500' : 'bg-primary-300'
              } rounded-full mix-blend-overlay blur-3xl animate-float animation-delay-4000`}></div>
            </div>
            
            <Container className="relative z-10 py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <FadeInSection>
                  <div className="inline-flex items-center px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                    Trusted by 500+ Businesses
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">
                    {currentBanner.title.split(' ')[0]}
                    <span className={`block bg-gradient-to-r from-white ${
                      isDarkMode ? 'to-primary-300' : 'to-primary-200'
                    } bg-clip-text text-transparent`}>
                      {currentBanner.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed max-w-2xl">
                    {currentBanner.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link to="/contact">
                      <Button 
                        variant="primary"
                        size="lg" 
                        className="group relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <span className="mr-2">Get Started</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button 
                        variant="ghost" 
                        size="lg"
                        className="text-white border border-white/30 hover:bg-white/10"
                      >
                        Our Services
                      </Button>
                    </Link>
                  </div>
                </FadeInSection>
                
                <FadeInSection direction="right" delay={300} className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-2xl"></div>
                    <img 
                      src={currentBanner.image_url} 
                      alt={currentBanner.title} 
                      className="relative rounded-2xl shadow-2xl object-cover h-[600px] w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200';
                      }}
                    />
                    
                    {/* Floating Stats Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            <AnimatedCounter end="98%" />
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
              
              {/* Banner Navigation Dots */}
              {banners.length > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToBanner(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentBannerIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </Container>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/80">No banners available</p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <Container className="relative">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.id} className="text-center group">
                  <div className="relative">
                    <div className="text-4xl md:text-6xl font-bold text-primary mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={stat.value} />
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Services Section */}
      <FadeInSection>
        <div className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
            <div className="absolute top-1/2 -left-8 w-64 h-64 bg-secondary/5 dark:bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-12 left-1/3 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
            <div className="relative text-center mb-16">
              <div className="inline-flex items-center px-6 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium mb-6 shadow-sm hover:shadow-md transition-all duration-300">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Our Services
                </span>
              </div>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">
                  Comprehensive Financial Solutions
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  We offer a wide range of financial and accounting services designed to help your business grow, optimize operations, and achieve long-term success in today's competitive landscape.
                </p>
              </div>
            </div>
            
            {/* Dynamic Services Section */}
            <div className="relative">
              <ServicesSection 
                limit={3} 
                showTitle={false} 
                showCta={true} 
                className="relative z-10"
              />
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '500+', label: 'Happy Clients' },
                  { value: '99%', label: 'Client Retention' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-3xl font-bold text-primary dark:text-primary-light mb-2 transition-all duration-300 group-hover:scale-110">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </FadeInSection>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <FadeInSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. See what our clients have to say about our services and expertise.
            </p>
          </FadeInSection>
          
          {testimonialsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : testimonialsError ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-4 py-2 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {testimonialsError}
              </div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <FadeInSection key={testimonial.id || testimonial._id} delay={index * 200}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" variant="glass">
                    <div className="p-8">
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mb-6">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 mr-4">
                          <img 
                            src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author || 'Anonymous')}&background=random`}
                            alt={testimonial.author || 'Client'}
                            className="w-full h-full rounded-full object-cover border-2 border-primary"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author || 'Anonymous')}&background=random`;
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author || 'Anonymous'}</h4>
                          {testimonial.position && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.position}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No testimonials available at the moment.</p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-full h-[200%] bg-radial-gradient from-white/10 to-transparent opacity-30 dark:opacity-20 animate-float"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-full h-[200%] bg-radial-gradient from-white/5 to-transparent opacity-20 dark:opacity-10 animate-float animation-delay-3000"></div>
          <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        </div>
        
        <Container className="relative z-10">
          <FadeInSection className="text-center">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/15 transition-all duration-300 group">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-3 shadow-glow shadow-green-400/50 animate-pulse"></span>
              <span className="text-white font-medium">
                GET STARTED TODAY
              </span>
              <svg className="w-4 h-4 ml-2 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-white to-primary-50 bg-clip-text text-transparent">
                Financial Operations?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed font-light text-white">
              Schedule a free consultation with our experts and discover how we can help your business achieve financial excellence and sustainable growth.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-lg mx-auto">
              <Link to="/contact" className="w-full">
                <Button 
                  size="lg"
                  className="w-full px-2 py-2 bg-white text-primary-700 hover:bg-gray-50 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span className="font-medium">Schedule Consultation</span>
                </Button>
              </Link>
              
              {/* <Link to="/services" className="w-full">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full px-2 py-2 border-2 border-white text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="font-medium">Explore Services</span>
                </Button>
              </Link> */}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-100 dark:border-gray-700/50">
        <Container>
          <FadeInSection className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-10">
              Trusted by innovative companies worldwide
            </p>
            {companiesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : companiesError ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {companiesError}
              </div>
            ) : trustedCompanies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {trustedCompanies.map((company) => (
                  <div 
                    key={company._id} 
                    className="flex items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative w-32 h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                      {company.logo ? (
                        <img 
                          src={company.logo_url} 
                          alt={company.company_name} 
                          className="h-8 w-auto max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company_name || 'Company')}&background=random`;
                          }}
                        />
                      ) : (
                        <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                          {company.company_name || 'Company'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No companies to display at the moment.
              </div>
            )}
          </FadeInSection>
        </Container>
      </section>
    </>
  );
};

export default Home;