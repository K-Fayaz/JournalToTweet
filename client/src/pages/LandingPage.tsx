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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar scrollToSection={scrollToSection} navItems={navItems} activeSection={activeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <Hero />
      <Marquee/>
      <WhySection />
      <HowSection/> 
      <Testimonials />
      <Footer/>
    </div>
  );
}

export default LandingPage;