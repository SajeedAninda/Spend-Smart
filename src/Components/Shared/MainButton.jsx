import React from 'react'

const MainButton = ({ text, icon: Icon, onClick, className = '' }) => {
  return (
    <div className='relative group'>
      <button
        className={`relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] dark:bg-white shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${className}`}
        onClick={onClick}
      >
        <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

        <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c]'>
          <div className='relative z-10 flex items-center space-x-2'>
            <span className='transition-all duration-500 group-hover:translate-x-1'>
              {text}
            </span>
            {Icon && (
              <Icon className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
            )}
          </div>
        </span>
      </button>
    </div>
  )
}

export default MainButton
