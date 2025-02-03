import React, { useState } from 'react'
import { FaGoogle, FaUpload } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
import registerImg from '../../../assets/registerImg.jpg'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import axios from 'axios'

const Register = () => {
  let axiosInstance = useAxiosInstance()
  let { signUp, googleLogin } = useAuth()
  let navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setSelectedImage(null)
      setPreview(null)
      toast.error('Please upload a valid image')
    }
  }

  let handleRegister = async (e) => {
    e.preventDefault()
    let fullName = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value

    if (!selectedImage) {
      return toast.error('Please upload an image')
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters!')
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error('Password must contain at least one capital letter!')
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return toast.error('Password must contain at least one special character!')
    }

    let loadingToast = toast.loading('Registering...')

    try {
      let formData = new FormData()
      formData.append('image', selectedImage)
      let imgBBRes = await axios.post(
        'https://api.imgbb.com/1/upload?key=cbd289d81c381c05afbab416f87e8637',
        formData
      )
      let imageUrl = imgBBRes.data.data.display_url

      let userCredential = await signUp(email, password)
      let user = userCredential.user

      let userDetails = { name: fullName, email, imageUrl}
      let res = await axiosInstance.post('/userRegister', userDetails)

      if (res.data.insertedId) {
        toast.dismiss(loadingToast)
        toast.success('Registration Successful. Please Login')
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
      toast.dismiss(loadingToast)
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full h-fit flex'>
      <div className='loginDiv w-[600px] py-12 px-20'>
        <h3 className='font-bold text-[18px] text-[#30e4ba]'>Spend Smart</h3>
        <h1 className='font-bold text-[32px] text-[#02101c] mt-3'>Register.</h1>

        <form onSubmit={handleRegister} className='mt-6'>
          <div>
            <label htmlFor='name' className='text-[#02101c] font-semibold'>
              Full Name
            </label>
            <input
              className='w-full px-4 py-3 mt-2 rounded-xl border border-[#02101c]'
              name='name'
              id='name'
              type='text'
              placeholder='Type Your Full Name'
              required
            />
          </div>

          <div className='mt-3'>
            <label htmlFor='email' className='text-[#02101c] font-semibold'>
              Email
            </label>
            <input
              className='w-full px-4 py-3 mt-2 rounded-xl border border-[#02101c]'
              name='email'
              id='email'
              type='email'
              placeholder='Type Your Email Address'
              required
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
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className='mt-6'>
            <input type='file' id='fileInput' className='hidden' accept='image/*' onChange={handleImageChange} />
            <label htmlFor='fileInput' className='cursor-pointer'>
              <div className='w-full border-2 border-dotted border-gray-400 p-10 rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-gray-200 transition-all duration-200'>
                {preview ? (
                  <img src={preview} alt='Preview' className='w-20 h-20 object-cover rounded-full' />
                ) : (
                  <>
                    <p className='text-gray-500 font-semibold'>Upload Your Photo</p>
                    <FaUpload className='text-gray-500' />
                  </>
                )}
              </div>
            </label>
          </div>

          <div className='relative group mt-4 w-full'>
            <button type='submit' className='relative w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c]'>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>Register</span>
                  <LuLogIn className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </div>
        </form>

        <div className='relative my-5'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-600'> Or Register with </span>
          </div>
        </div>

        <div className='relative group mt-4 w-full'>
          <button className='relative w-full flex justify-center p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba] shadow-md cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
            <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#30e4ba]'>
              <div className='relative z-10 flex items-center space-x-2'>
                <FaGoogle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                <span className='transition-all duration-500 group-hover:translate-x-1'>Register with Google</span>
              </div>
            </span>
          </button>
        </div>
      </div>

      <div className='imgDiv flex-1'>
        <img className='object-cover w-full h-full' src={registerImg} alt='' />
      </div>
    </div>
  )
}

export default Register
