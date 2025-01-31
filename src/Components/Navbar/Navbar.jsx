import React from 'react'
import logo from '../../assets/spend-smart-logo.png'
import { IoLogIn } from 'react-icons/io5'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-[14vh] bg-gradient-to-r from-[#30e4ba]  via-white to-[#30e4ba] flex items-center'>
      <div className='w-[1000px] mx-auto flex justify-between items-center'>
        <div className='w-[33%] flex flex-col items-center text-center'>
          <h1 className='text-[#02101c] font-black text-[16px] italic'>
            SpendSmart
          </h1>
          <TypeAnimation
            sequence={[
              'Make Every Penny Count',
              1000,
              'Smarter Choices, Bigger Savings',
              1000,
              'Spend Wisely, Live Freely',
              1000,
              'Budget Better, Live Smarter',
              1000
            ]}
            speed={50}
            className='text-[#02101c] font-black italic text-[16px]'
            repeat={Infinity}
          />
        </div>

        <div className='w-[33%] flex justify-center'>
          <Link to={"/"}>
          <img className='w-[120px] cursor-pointer' src={logo} alt='' />
          </Link>
        </div>
        <div className='w-[33%] flex justify-end'>
          <div class='flex items-center justify-center h-screen'>
            <div class='relative group'>
              <button class='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
                <span class='absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

                <span class='relative z-10 block px-6 py-3 rounded-xl bg-gray-950'>
                  <div class='relative z-10 flex items-center space-x-2'>
                    <span class='transition-all duration-500 group-hover:translate-x-1'>
                      Login
                    </span>
                    <IoLogIn className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
