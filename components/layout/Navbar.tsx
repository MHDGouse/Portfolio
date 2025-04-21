"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, Menu, X } from 'lucide-react';
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
    // In a real implementation, this would point to an actual PDF file
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
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6" />
          <span className="text-xl font-bold">gouse.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#home" className="nav-link">Home</Link>
          <Link href="#skills" className="nav-link">Skills</Link>
          <Link href="#projects" className="nav-link">Projects</Link>
          <Link href="#experience" className="nav-link">Experience</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
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
        <div className="flex flex-col px-4 py-2 space-y-4">
          <Link href="#home" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link href="#skills" className="nav-link" onClick={toggleMenu}>Skills</Link>
          <Link href="#projects" className="nav-link" onClick={toggleMenu}>Projects</Link>
          <Link href="#experience" className="nav-link" onClick={toggleMenu}>Experience</Link>
          <Link href="#contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
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