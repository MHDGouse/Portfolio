"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = "/assets/pdf/Mohammed_Gouse_Resume.pdf";
    link.download = 'Gouse_Developer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 font-['Courier_Prime']">
        <Link href="/" className="flex items-center space-x-2">
          <Terminal className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-bold">gouse.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative group"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
        </div>

        <button 
          onClick={downloadResume}
          className="hidden md:block btn btn-primary"
        >
          Download Resume
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
        <div className="flex flex-col px-4 py-2 space-y-4 font-['Courier_Prime']">
          {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative group"
              onClick={toggleMenu}
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
          <button 
            onClick={() => {
              downloadResume();
              toggleMenu();
            }}
            className="btn btn-primary w-full"
          >
            Download Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;