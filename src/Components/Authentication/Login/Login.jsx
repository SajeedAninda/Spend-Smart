import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
import loginImg from '../../../assets/loginImg.jpg'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let { signIn, googleLogin } = useAuth()
  let navigate = useNavigate()

  
  let handleLogin = e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let loadingToast = toast.loading('Logging In...')
    signIn(email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log(user)
        toast.dismiss(loadingToast)
        toast.success('Logged In Successfully!')
        navigate('/')
      })
      .catch(error => {
        let errorCode = error.code
        console.log(errorCode)
        if (errorCode === 'auth/invalid-credential') {
          toast.dismiss(loadingToast)
          return toast.error('Invalid Username or Password')
        }
      })
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='loginDiv w-[530px] py-12 px-20'>
        <h3 className='font-bold text-[18px] text-[#30e4ba]'>Spend Smart</h3>
        <h1 className='font-bold text-[32px] text-[#02101c] mt-3'>Sign In.</h1>
        <form onSubmit={handleLogin} className='mt-6'>
          <div>
            <label htmlFor='email' className='text-[#02101c] font-semibold'>
              Email
            </label>
            <input
              className='w-full px-4 py-3 mt-2 rounded-xl border border-[#02101c]'
              name='email'
              id='email'
              type='email'
              placeholder='Type Your Email Address'
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='password' className='text-[#02101c] font-semibold'>
              Password
            </label>
            <input
              className='w-full px-4 py-3 mt-2 rounded-xl border border-[#02101c]'
              name='password'
              id='password'
              type='password'
              placeholder='Enter Your Password'
            />
          </div>
          <div className='relative group mt-4 w-full'>
            <button
              type='submit'
              class='relative w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
              <span class='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div class='relative z-10 flex items-center space-x-2'>
                  <span class='transition-all duration-500 group-hover:translate-x-1'>
                    Login
                  </span>
                  <LuLogIn className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </div>
        </form>
        <div class='relative my-5'>
          <div class='absolute inset-0 flex items-center'>
            <div class='w-full border-t border-gray-300'></div>
          </div>
          <div class='relative flex justify-center text-sm'>
            <span class='px-2 bg-white text-gray-600'> Or continue with </span>
          </div>
        </div>

        <div className='relative group mt-4 w-full'>
          <button class='relative w-full flex justify-center p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
            <span class='relative z-10 block px-6 py-3 rounded-xl bg-[#30e4ba] '>
              <div class='relative z-10 flex items-center space-x-2'>
                <FaGoogle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                <span class='transition-all duration-500 group-hover:translate-x-1'>
                  Login with Google
                </span>
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className='imgDiv flex-1'>
        <img className='object-cover w-full h-full' src={loginImg} alt='' />
      </div>
    </div>
  )
}

export default Login
