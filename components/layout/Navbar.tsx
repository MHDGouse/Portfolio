"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Menu, X,Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';


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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/80 dark:bg-black/80 shadow-md backdrop-blur py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto flex items-center px-4 font-['Courier_Prime']">
        <Link href="/" className="flex items-center space-x-2">
          <Terminal className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-bold">mhdgouse.dev</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative group text-black dark:text-white"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
        </div>


        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="https://docs.google.com/document/d/1MSPikmrp3ujm6066aRqxSvtD_EAt76HE/edit?usp=sharing&ouid=103324854266164666221&rtpof=true&sd=true"
            download="Gouse_Developer_Resume.pdf"
            className="hidden md:flex items-center btn btn-primary dark:text-black dark:bg-white relative overflow-hidden group"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-full opacity-100 group-hover:opacity-0">
            View Resume
            </span>
            <Download className="absolute right-0 transition-all duration-300 transform translate-x-full group-hover:translate-x-0 group-hover:right-[50%] group-hover:top-0 group-hover:translate-y-1/2" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-4" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6 text-black dark:text-white" /> : <Menu className="h-6 w-6 text-black dark:text-white" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-black/95 shadow-md`}>
        <div className="flex flex-col px-4 py-2 space-y-4 font-['Courier_Prime']">
          {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative group text-black dark:text-white"
              onClick={toggleMenu}
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = "/assets/pdf/Mohammed_Gouse_Resume.pdf";
              link.download = 'Gouse_Developer_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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