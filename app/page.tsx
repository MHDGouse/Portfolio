"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/layout/Loading';
import NewProjects from '@/components/sections/NewProjects';



export default function Home() {
  
  // Loading animation state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(time);
  }, []);

  // Smooth scrolling effect
  useEffect(() => {
    const handleNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.replace('#', '');
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Account for navbar height
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  // Framer Motion animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-white">
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          <Navbar />
          <Hero />
          <Skills />
          <NewProjects />
          {/* <Projects /> */}
          <Experience />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}