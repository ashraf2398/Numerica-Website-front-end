import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import GradientBackground from '../../components/ui/GradientBackground';
import FadeInSection from '../../components/ui/FadeInSection';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const Home = () => {
  // Services data
  const services = [
    {
      id: 1,
      title: 'Accounting Services',
      description: 'Comprehensive bookkeeping, financial reporting, and accounting solutions tailored to your business needs.',
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Monthly Financial Reports', 'Expense Tracking', 'Cash Flow Management']
    },
    {
      id: 2,
      title: 'Tax Planning & Compliance',
      description: 'Strategic tax planning and preparation to minimize liabilities while ensuring full compliance.',
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      features: ['Tax Strategy Planning', 'Compliance Management', 'Audit Support']
    },
    {
      id: 3,
      title: 'Audit & Assurance',
      description: 'Independent financial audits to verify accuracy and compliance with accounting standards.',
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['Financial Audits', 'Risk Assessment', 'Compliance Reviews']
    },
    {
      id: 4,
      title: 'Financial Advisory',
      description: 'Expert financial guidance to help your business make informed decisions and achieve goals.',
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ['Strategic Planning', 'Investment Advice', 'Growth Consulting']
    }
  ];

  // Stats data
  const stats = [
    { id: 1, value: '500+', label: 'Clients Served' },
    { id: 2, value: '25+', label: 'Years Experience' },
    { id: 3, value: '100%', label: 'Client Satisfaction' },
    { id: 4, value: '35', label: 'Expert Accountants' }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Numérica transformed our financial operations and helped us save thousands in tax liability. Their expertise is unmatched.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5
    },
    {
      id: 2,
      quote: "Their financial advisory services gave us the clarity we needed to scale our business effectively. Highly professional team.",
      author: "Michael Chen",
      position: "Founder, GrowSmart Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 5
    },
    {
      id: 3,
      quote: "The most responsive and thorough accounting team we've ever worked with. They truly care about our success.",
      author: "Alicia Martinez",
      position: "CFO, Nexus Enterprises",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <GradientBackground variant="primary" className="absolute inset-0" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        
        <Container className="relative z-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Trusted by 500+ Businesses
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Expert
                <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Financial
                </span>
                <span className="block text-4xl md:text-6xl">Solutions</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Comprehensive accounting, tax planning, and financial advisory services 
                to help your business thrive in today's complex financial landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary group"
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
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80" 
                  alt="Financial consulting" 
                  className="relative rounded-2xl shadow-2xl object-cover h-[600px] w-full"
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
        </Container>
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
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <Container>
          <FadeInSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              OUR EXPERTISE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We offer a comprehensive range of accounting and financial services 
              tailored to your business needs and growth objectives.
            </p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <FadeInSection key={service.id} delay={index * 100}>
                <Card 
                  className="h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  variant="elevated"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to={`/services#${service.id}`} 
                      className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors duration-300 group"
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              </FadeInSection>
            ))}
          </div>
          
          <FadeInSection className="text-center mt-12">
            <Link to="/services">
              <Button variant="primary" size="lg" className="shadow-xl">
                View All Services
              </Button>
            </Link>
          </FadeInSection>
        </Container>
      </section>

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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={testimonial.id} delay={index * 200}>
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  variant="glass"
                >
                  <div className="p-8">
                    {/* Rating Stars */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full rounded-full object-cover border-2 border-primary"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <GradientBackground variant="secondary" className="absolute inset-0" />
        
        <Container className="relative z-10">
          <FadeInSection className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              GET STARTED TODAY
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Financial Operations?
              </span>
            </h2>
            
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Schedule a free consultation with our experts today and discover how we can help your business grow and thrive.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary group"
                >
                  <span className="mr-2">Schedule Consultation</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </Button>
              </Link>
              
              <Link to="/services">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-white border border-white/30 hover:bg-white/10"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <FadeInSection className="text-center">
            <p className="text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm font-medium mb-8">
              Trusted by leading companies across industries
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="w-24 h-12 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">LOGO</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>
    </>
  );
};

export default Home;