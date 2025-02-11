import React from 'react'
import { MdEditSquare } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const BudgetSummary = ({ transactionData, budgetData }) => {
  return (
    <div className='w-full bg-[#cbfdf2] rounded-lg p-8'>
      <div className='topPortion flex justify-between items-start'>
        <div>
          <div className='flex gap-3 items-center'>
            <div className='w-5 h-5 rounded-full bg-[#727191]'></div>
            <h3 className='text-[#02101c] font-bold text-[20px]'>Dining Out</h3>
          </div>
          <p className='mt-3 text-[#02101c] font-semibold'>Maximum of $250</p>
        </div>

        <div className='flex gap-4 items-center'>
          <MdEditSquare className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-[#02101c]' />
          <RiDeleteBin7Fill className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-red-600' />
        </div>
      </div>

      <div className='mt-4 flex justify-between items-center'>
        <div className='flex flex-1 items-center'>
          <div className={`w-1 h-9 rounded-lg bg-[#773372]`}></div>
          <div className='pl-4'>
            <p className='text-[#02101c] font-semibold text-[14px] capitalize'>
              Total Budget
            </p>
            <p className='text-[#02101c] font-semibold text-[14px] capitalize'>
              $302
            </p>
          </div>
        </div>
        <div className='flex flex-1 items-center'>
          <div className={`w-1 h-9 rounded-lg bg-white`}></div>
          <div className='pl-4'>
            <p className='text-[#02101c] font-semibold text-[14px] capitalize'>
              Total Spent
            </p>
            <p className='text-[#02101c] font-semibold text-[14px] capitalize'>
              $302
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetSummary
