import React from 'react'
import logo from '../../assets/spend-smart-logo.png'
import { IoLogIn } from 'react-icons/io5'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import MainButton from '../Shared/MainButton'
import useCurrentUserData from '../Hooks/useCurrentUserData'

const Navbar = () => {
  let { userData, isUserLoading } = useCurrentUserData()
  

  return (
    <div className='w-full h-[14vh] bg-gradient-to-r from-[#30e4ba] via-white to-[#30e4ba] flex items-center'>
      <div className='w-[1000px] mx-auto flex justify-between items-center'>
        {/* Brand Name + Tagline */}
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

        {/* Logo */}
        <div className='w-[33%] flex justify-center'>
          <Link to={'/'}>
            <img className='w-[120px] cursor-pointer' src={logo} alt='' />
          </Link>
        </div>

        {/* Buttons */}
        <div className='w-[33%] flex justify-end space-x-4'>
          {userData ? (
            <MainButton
              text='Logout'
              icon={IoLogIn}
              onClick={() => console.log('Login Clicked')}
            />
          ) : (
            <Link to={'/login'}>
              <MainButton
                text='Login'
                icon={IoLogIn}
                onClick={() => console.log('Login Clicked')}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
