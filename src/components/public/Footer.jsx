import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <Container>
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">
                Numérica
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Professional accounting and financial consulting services for businesses of all sizes.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label={platform}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/team', label: 'Our Team' },
                { path: '/contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                { path: '/services#accounting', label: 'Accounting Services' },
                { path: '/services#tax', label: 'Tax Services' },
                { path: '/services#audit', label: 'Audit Services' },
                { path: '/services#advisory', label: 'Advisory Services' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Office 123, Creek Building, Downtown, Cairo, Egypt</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@numericatax.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+20 123 456 7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} Numérica. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { path: '/privacy', label: 'Privacy Policy' },
                { path: '/terms', label: 'Terms of Service' },
                { path: '/cookies', label: 'Cookie Policy' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 