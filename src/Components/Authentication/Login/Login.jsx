import React from 'react'

const Login = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='loginDiv w-[35%] py-12 px-20'>
        <h3 className='font-bold text-[18px] text-[#30e4ba]'>Spend Smart</h3>
        <h1 className='font-bold text-[32px] text-[#02101c] mt-3'>Sign In.</h1>
        <form className='mt-6'>
            <div>
                <label htmlFor="email" className='text-[#02101c] font-semibold'>Email</label>
                <input className='w-full px-4 py-3 mt-2 rounded-xl border border-[#02101c]' name='email' id='email' type="email" placeholder='Type Your Email Address'/>
            </div>
        </form>
      </div>
      <div className='imgDiv'></div>
    </div>
  )
}

export default Login
