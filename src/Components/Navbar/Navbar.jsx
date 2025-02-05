import React from 'react'
import logo from '../../assets/spend-smart-logo.png'
import { IoLogIn } from 'react-icons/io5'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import MainButton from '../Shared/MainButton'
import useCurrentUserData from '../Hooks/useCurrentUserData'
import useAuth from '../Hooks/useAuth'
import { IoMdLogOut } from 'react-icons/io'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const Navbar = () => {
  let { userData, isUserLoading } = useCurrentUserData()
  let { logOut } = useAuth()

  console.log(userData)

  let handleLogout = () => {
    Swal.fire({
      title: 'Are you to Logout?',
      text: 'Click Yes if You want to Log out of the website!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    }).then(result => {
      if (result.isConfirmed) {
        logOut().then(toast.success('Logged Out of the account'))
      }
    })
  }

  return (
    <div className='w-full h-[14vh] bg-gradient-to-r from-[#30e4ba] via-white to-[#30e4ba] flex items-center'>
      <div className='w-[1150px] mx-auto flex justify-between items-center'>
        {/* Brand Name + Tagline or Links*/}
        <div className='w-[33%]'>
          {userData ? (
            <div className='flex justify-between items-center '>
              <li className='text-[#02101c] font-bold hover:opacity-50 transition-all duration-150 hover:underline cursor-pointer text-[16px] list-none'>
                Transactions
              </li>
              <li className='text-[#02101c] font-bold hover:opacity-50 transition-all duration-150 hover:underline cursor-pointer text-[16px] list-none'>
                Budgets
              </li>
              <li className='text-[#02101c] font-bold hover:opacity-50 transition-all duration-150 hover:underline cursor-pointer text-[16px] list-none'>
                Piggy Bank
              </li>
              <li className='text-[#02101c] font-bold hover:opacity-50 transition-all duration-150 hover:underline cursor-pointer text-[16px] list-none'>
                Bills
              </li>
            </div>
          ) : (
            <div className='flex flex-col items-center text-center'>
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
          )}
        </div>

        {/* Logo */}
        <div className='w-[33%] flex justify-center'>
          <Link to={'/'}>
            <img className='w-[120px] cursor-pointer' src={logo} alt='' />
          </Link>
        </div>

        {/* Buttons */}
        <div className='w-[33%] flex items-center justify-end space-x-4'>
          {userData && (
            <div>
              <img
                className='w-[50px] h-[50px] rounded-full border-2 object-cover border-[#02101c]'
                src={userData?.imageUrl}
                alt=''
              />
            </div>
          )}
          {userData ? (
            <MainButton
              text='Logout'
              icon={IoMdLogOut}
              onClick={handleLogout}
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
