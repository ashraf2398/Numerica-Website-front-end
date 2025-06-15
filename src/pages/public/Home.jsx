import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Home = () => {
  // Services data
  const services = [
    {
      id: 1,
      title: 'Accounting Services',
      description: 'We ensure all business transactions are accurately recorded and reconciled.',
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Tax Planning & Compliance',
      description: 'Strategic tax planning and preparation to minimize tax liabilities while ensuring compliance.',
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Audit & Assurance',
      description: 'Independent financial audits to verify accuracy and compliance with accounting standards.',
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Financial Advisory',
      description: 'Expert financial guidance to help your business make informed decisions and achieve goals.',
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
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
      quote: "Numérica transformed our financial operations and helped us save thousands in tax liability.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      quote: "Their financial advisory services gave us the clarity we needed to scale our business effectively.",
      author: "Michael Chen",
      position: "Founder, GrowSmart Solutions",
      image: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      id: 3,
      quote: "The most responsive and thorough accounting team we've ever worked with. Highly recommended!",
      author: "Alicia Martinez",
      position: "CFO, Nexus Enterprises",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80" 
            alt="Financial background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="max-w-2xl lg:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Expert Accounting & Financial Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Numérica provides comprehensive accounting, tax planning, and financial advisory 
                services to help your business thrive in today's complex financial landscape.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="animate-bounce-subtle">
                    Get Started
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary" size="lg">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Business accounting" 
                  className="rounded-lg shadow-2xl object-cover h-[500px] w-full relative z-10"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">OUR EXPERTISE</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of accounting and financial services tailored to your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="text-center h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4 bg-primary/10 w-20 h-20 rounded-full mx-auto p-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {service.description}
                </p>
                <Link to={`/services#${service.id}`} className="mt-4 inline-block text-primary font-medium hover:underline">
                  Learn more →
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="primary">
                View All Services
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what our clients have to say about our services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full rounded-full object-cover border-2 border-primary"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">GET STARTED TODAY</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Financial Operations?
              </h2>
              <p className="text-lg opacity-90">
                Schedule a free consultation with our experts today and discover how we can help your business grow.
              </p>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center mb-8">
            <p className="text-gray-500 uppercase tracking-wider text-sm font-medium">Trusted by leading companies</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 md:w-32 md:h-16 flex items-center justify-center">
                <div className="text-gray-400 opacity-70">
                  <div className="w-full h-full bg-gray-300 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home; 