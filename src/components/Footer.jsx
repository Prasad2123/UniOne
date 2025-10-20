import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#88BDF2] to-[#6A89A7] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h2 className="text-xl font-bold">UniOne</h2>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/about" className="hover:underline transition-colors duration-200 hover:text-blue-100">
              About
            </Link>
            <Link to="/contact" className="hover:underline transition-colors duration-200 hover:text-blue-100">
              Contact
            </Link>
            <Link to="/terms" className="hover:underline transition-colors duration-200 hover:text-blue-100">
              Terms
            </Link>
            <Link to="/privacy" className="hover:underline transition-colors duration-200 hover:text-blue-100">
              Privacy
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 mt-6 pt-6">
          <p className="text-center text-sm text-white/80">
            © 2025 UniOne. All rights reserved. Empowering students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
