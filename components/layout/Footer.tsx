import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-bold text-lg">gouse.dev</p>
            <p className="text-sm text-gray-600">Fullstack Developer</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} gouse.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;