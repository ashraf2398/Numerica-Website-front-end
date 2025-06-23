import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getTransformClass = () => {
    if (isVisible) return 'translate-y-0 opacity-100';
    
    switch (direction) {
      case 'up':
        return 'translate-y-8 opacity-0';
      case 'down':
        return '-translate-y-8 opacity-0';
      case 'left':
        return 'translate-x-8 opacity-0';
      case 'right':
        return '-translate-x-8 opacity-0';
      default:
        return 'translate-y-8 opacity-0';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`transform transition-all duration-1000 ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;