import React from 'react'
import { SiKnowledgebase } from 'react-icons/si'
import { TbTransactionDollar } from 'react-icons/tb'

const Transactions = () => {
  return (
    <div>
      <div className='w-[1150px] mx-auto py-8'>
        <div className='upperDiv flex justify-between items-center'>
          <h1 className='text-[32px] font-bold text-[#02101c]'>Transactions</h1>
          <div className='relative group'>
            <button class='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c]  shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
              <span class='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

              <span class='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div class='relative z-10 flex items-center space-x-2'>
                  <span class='transition-all duration-500 group-hover:translate-x-1'>
                    Add New Transaction
                  </span>
                  <TbTransactionDollar className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </div>
        </div>

        <div className='lowerDiv bg-[#cbfdf2] rounded-lg w-full p-8 mt-10'>
          <div className='queryDiv flex justify-between items-center'>
            <div className='searchField w-[50%]'>
              <input className='w-[70%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]' placeholder='Search Transaction By Name' type='text' />
            </div>

            <div className='filterField w-[50%]'>
                <div className='flex'>
                    <p className='text-[14px] font-semibold text-[#02101c]'>Sort By</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
