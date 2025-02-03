import React from 'react'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import toast from 'react-hot-toast'

const SocialLogin = () => {
  let { googleLogin } = useAuth()
  let axiosInstance = useAxiosInstance()
  let navigate = useNavigate()
  let location = useLocation()

  let handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        const user = result.user
        let userDetails = {
          name: user?.displayName,
          email: user?.email,
          imageUrl: user?.photoURL
        }

        axiosInstance.post('/userGoogleRegister', userDetails).then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            console.log(res.data)
          }
        })
        toast.success('Logged In Successfully!', {
          duration: 3000
        })
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const isLoginPage = location.pathname.endsWith('/login')
  const buttonText = isLoginPage ? 'Login with Google' : 'Register with Google'

  return (
    <div className='relative group mt-4 w-full'>
      <button onClick={handleGoogleLogin} className='relative w-full flex justify-center p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
        <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#30e4ba]'>
          <div className='relative z-10 flex items-center space-x-2'>
            <FaGoogle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
            <span className='transition-all duration-500 group-hover:translate-x-1'>
              {buttonText}
            </span>
          </div>
        </span>
      </button>
    </div>
  )
}

export default SocialLogin