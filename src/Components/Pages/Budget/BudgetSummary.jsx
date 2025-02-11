import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { MdEditSquare } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

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

      <div className='latestSpending bg-white p-6 rounded-lg mt-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-[#02101c] font-semibold text-[18px]'>
            Latest Spending
          </h3>
          <Link
            to={'/transactions'}
            className='flex gap-1 items-center hover:underline text-[15px]'
          >
            All Transactions{' '}
            <IoIosArrowRoundForward className='text-[#02101c] font-bold text-[25px]' />
          </Link>
        </div>

        <Link
          to={'/transactions'}
          className='flex p-2 rounded-lg cursor-pointer mt-5 justify-between items-center hover:bg-slate-200'
        >
          <p className='text-[#02101c] font-semibold text-[16px]'>
            Transaction Name
          </p>
          <div className='flex flex-col items-center'>
            <p className='text-green-600 font-semibold text-[16px]'>+222.00</p>
            <p className='text-gray font-semibold text-[12px]'>2/3/2025</p>
          </div>
        </Link>
        <Link
          to={'/transactions'}
          className='flex p-2 rounded-lg cursor-pointer mt-5 justify-between items-center hover:bg-slate-200'
        >
          <p className='text-[#02101c] font-semibold text-[16px]'>
            Transaction Name
          </p>
          <div className='flex flex-col items-center'>
            <p className='text-red-600 font-semibold text-[16px]'>-112.00</p>
            <p className='text-gray font-semibold text-[12px]'>4/3/2025</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BudgetSummary
