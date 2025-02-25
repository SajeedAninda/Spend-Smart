import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/spend-smart-logo.png';

const Footer = () => {
  return (
    <footer className="p-4 bg-gradient-to-br from-[#f2fbf6] to-[#30e4ba] md:p-8 lg:p-10">
      <div>
        {/* Logo */}
        <div className="flex justify-center">
          <Link to={'/'}>
            <img className="w-[140px]" src={logo} alt="Spent Smart Logo" />
          </Link>
        </div>

        {/* Tagline */}
        <p className="my-6 text-[#02101c] font-bold text-center text-xl">
        Smart Spending Starts Here – Take Control of Your Finances
        </p>

        {/* Links */}
        <ul className="flex flex-wrap justify-center items-center mb-6 text-[#02101c]">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              
            </a>
          </li>
          <li>
            <Link to={'/'} className="mr-4 hover:underline md:mr-6">
              
            </Link>
          </li>
          <li>
            <Link to={'/'} className="mr-4 hover:underline md:mr-6">
              
            </Link>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="flex justify-center">
          <span className="text-lg text-center font-semibold text-[#02101c]">
            © 2025{' '}
            <a href="#" className="hover:underline">
              Spend Smart™
            </a>{' '}
            <p>All Rights Reserved.</p>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;