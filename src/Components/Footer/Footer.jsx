import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/spend-smart-logo.png';
import useCurrentUserData from '../Hooks/useCurrentUserData';

const Footer = () => {
  let { userData, isUserLoading } = useCurrentUserData();

  return (
    <footer className="p-4 bg-gradient-to-br from-[#f2fbf6] to-[#30e4ba] md:p-8 lg:p-10">
      <div>
        <div className="flex justify-center">
          <Link to={'/'}>
            <img className="w-[140px]" src={logo} alt="Spend Smart Logo" />
          </Link>
        </div>

        <p className="my-6 text-[#02101c] font-bold text-center text-xl">
          Smart Spending Starts Here – Take Control of Your Finances
        </p>

        <ul className="flex flex-wrap justify-center items-center mb-6 text-[#02101c]">
          {userData ? (
            <>
              <li>
                <Link to="/transactions" className="mr-4 hover:underline md:mr-6">
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/budget" className="mr-4 hover:underline md:mr-6">
                  Budgets
                </Link>
              </li>
              <li>
                <Link to="/piggy_bank" className="mr-4 hover:underline md:mr-6">
                  Piggy Bank
                </Link>
              </li>
              <li>
                <Link to="/recurring_bills" className="mr-4 hover:underline md:mr-6">
                  Bills
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="mr-4 hover:underline md:mr-6">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="mr-4 hover:underline md:mr-6">
                  Register
                </Link>
              </li>
            </>
          )}
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>

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