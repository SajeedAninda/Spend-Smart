import { useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import React from 'react'
import toast from 'react-hot-toast'
import { RiUserSharedFill } from 'react-icons/ri'

const DemoUser = () => {
  let { signIn } = useAuth()
  let navigate = useNavigate()

  let handleLogin = e => {
    e.preventDefault()
    let email = 'demo@user.com'
    let password = 'Demo!2345678'
    let loadingToast = toast.loading('Logging In...')

    signIn(email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log(user)
        toast.dismiss(loadingToast)
        toast.success('Logged In Successfully As an User!')
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
    <div onClick={handleLogin} className='relative group mt-4 w-full'>
      <button
        type='submit'
        class='relative w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
      >
        <span class='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
          <div class='relative z-10 flex items-center space-x-2'>
            <span class='transition-all duration-500 group-hover:translate-x-1'>
              Demo User Login
            </span>
            <RiUserSharedFill className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
          </div>
        </span>
      </button>
    </div>
  )
}

export default DemoUser
