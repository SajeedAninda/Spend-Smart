import React, { useState } from 'react'
import { RiMoneyDollarBoxFill } from "react-icons/ri";


const Budget = () => {
      const [isModalOpen, setIsModalOpen] = useState(false)
    
  return (
    <div className='w-[1150px] mx-auto py-8'>
      <div className='upperDiv flex justify-between items-center'>
        <h1 className='text-[32px] font-bold text-[#02101c]'>Budgets</h1>
        <div className='relative group'>
          <button
            className='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            onClick={() => setIsModalOpen(true)}
          >
            <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

            <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
              <div className='relative z-10 flex items-center space-x-2'>
                <span className='transition-all duration-500 group-hover:translate-x-1'>
                  Add a Budget
                </span>
                <RiMoneyDollarBoxFill
                 className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Budget
