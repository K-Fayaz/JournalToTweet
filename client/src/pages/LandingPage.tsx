import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhySection from '../components/WhySection';
import HowSection from '../components/HowSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [terminalStep, setTerminalStep] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email form state
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(100); // Example initial value
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading && spotsLeft > 0) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwiU-yvXmnVv4wzwkdaQ-EpfRLHWgK0XSqA8W_CziFVv07DUyuTIAvuL7TbrwDJ8SJbqQ/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ email }),
          }
        );
        if (response.ok) {
          setIsSubmitted(true);
          setSpotsLeft((prev) => Math.max(0, prev - 1));
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
          console.log("Email submitted:", email);
        } else {
          alert("There was a problem submitting your email. Please try again.");
        }
      } catch (error) {
        alert("There was a problem submitting your email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['hero', 'flow', 'why', 'how-it-works'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= window.scrollY + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Terminal animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'flow', label: 'Flow' },
    { id: 'why', label: 'Why' },
    { id: 'how-it-works', label: 'How It Works' },
    // { id: 'pricing', label: 'Pricing', isLink: true, path: '/pricing' }
  ];

  const heroInputRef = useRef<HTMLInputElement>(null);
  const focusHeroInput = () => {
    scrollToSection('hero');
    setTimeout(() => {
      heroInputRef.current?.focus();
    }, 400); // allow scroll animation to finish
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar scrollToSection={scrollToSection} navItems={navItems} activeSection={activeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} focusHeroInput={focusHeroInput} />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <Hero 
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        isSubmitted={isSubmitted}
        spotsLeft={spotsLeft}
        showConfetti={showConfetti}
        inputRef={heroInputRef}
      />
      <Marquee/>
      <WhySection 
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        isSubmitted={isSubmitted}
        spotsLeft={spotsLeft}
        showConfetti={showConfetti}
      />
      <HowSection/> 
      <Testimonials 
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        isSubmitted={isSubmitted}
        spotsLeft={spotsLeft}
        showConfetti={showConfetti}
      />
      <Footer/>
    </div>
  );
}

export default LandingPage;