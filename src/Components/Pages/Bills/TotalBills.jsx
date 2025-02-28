import TotalBillsSkeleton from '../../LoadingSkeletons/TotalBillSkeleton';
import React from 'react'
import { FaMoneyBillWheat } from 'react-icons/fa6'

const TotalBills = ({ allBills }) => {
  const totalAmount = (allBills && Array.isArray(allBills)) 
    ? allBills.reduce((sum, bill) => sum + parseFloat(bill.billingAmount || 0), 0) 
    : 0;

    if(!allBills){
      return <TotalBillsSkeleton />
    }

  return (
    <div className='bg-[#02101c] dark:bg-[#125042] h-[200px] rounded-lg py-8 px-8 gap-8 lg:gap-0 lg:px-20 flex justify-between items-center'>
      <FaMoneyBillWheat className='text-white text-[120px]' />
      <div className='flex flex-col '>
        <p className='text-[18px] lg:text-[25px] font-semibold text-white'>Total Recurring Bills</p>
        <h3 className='text-[25px] md:text-[35px] lg:text-[45px] font-bold text-white'>$ {totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default TotalBills
