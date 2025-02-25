import React, { useState } from 'react'
import logo from '../../assets/spend-smart-logo.png'
import { IoLogIn } from 'react-icons/io5'
import { IoMdLogOut } from 'react-icons/io'
import { FaBars } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { Link, NavLink } from 'react-router-dom'
import MainButton from '../Shared/MainButton'
import useCurrentUserData from '../Hooks/useCurrentUserData'
import useAuth from '../Hooks/useAuth'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  let { userData, isUserLoading } = useCurrentUserData()
  let { logOut } = useAuth()

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to Logout?',
      text: 'Click Yes if You want to Log out of the website!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    }).then(result => {
      if (result.isConfirmed) {
        logOut().then(() => toast.success('Logged Out of the account'))
      }
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='w-full px-6 lg:px-0 h-[14vh] bg-gradient-to-r from-[#30e4ba] via-white to-[#30e4ba] flex items-center'>
      <div className='w-[1150px] mx-auto flex justify-between items-center'>
        {/* Brand Name + Tagline or Links */}
        <div className='w-[33%]'>
          {userData ? (
            <div className='hidden md:flex justify-between items-center'>
              {[
                { path: '/transactions', label: 'Transactions' },
                { path: '/budget', label: 'Budgets' },
                { path: '/piggy_bank', label: 'Piggy Bank' },
                { path: '/recurring_bills', label: 'Bills' }
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `font-bold text-[16px] list-none transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'text-[#02101c] underline'
                        : 'text-[#02101c] hover:opacity-50 hover:underline'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          ) : (
            <div className=' hidden lg:flex flex-col items-center text-center'>
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

        <div className='w-[33%] flex items-center justify-end space-x-4'>
          {userData ? (
            <>
              <FaBars
                className='cursor-pointer text-2xl md:hidden'
                onClick={toggleSidebar}
              />
              <div className='hidden md:flex items-center space-x-4'>
                <img
                  className='w-[50px] h-[50px] rounded-full border-2 object-cover border-[#02101c]'
                  src={userData?.imageUrl}
                  alt=''
                />
                <MainButton
                  text='Logout'
                  icon={IoMdLogOut}
                  onClick={handleLogout}
                />
              </div>
            </>
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

      {/* Sidebar for Mobile */}
      {userData && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='px-6 py-12 flex flex-col space-y-8'>
            {[
              { path: '/transactions', label: 'Transactions' },
              { path: '/budget', label: 'Budgets' },
              { path: '/piggy_bank', label: 'Piggy Bank' },
              { path: '/recurring_bills', label: 'Bills' }
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `font-bold text-[16px] list-none transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#02101c] underline'
                      : 'text-[#02101c] hover:opacity-50 hover:underline'
                  }`
                }
                onClick={toggleSidebar}
              >
                {label}
              </NavLink>
            ))}
            <div className='flex items-center gap-4'>
              <MainButton
                text='Logout'
                icon={IoMdLogOut}
                onClick={handleLogout}
              />
              <img
                className='w-[50px] h-[50px] rounded-full border-2 object-cover border-[#02101c]'
                src={userData?.imageUrl}
                alt=''
              />
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}

export default Navbar
