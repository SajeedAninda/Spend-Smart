import React from 'react'
import { FaMoneyBillWheat } from 'react-icons/fa6'

const TotalBills = ({ allBills }) => {
  const totalAmount = (allBills && Array.isArray(allBills)) 
    ? allBills.reduce((sum, bill) => sum + parseFloat(bill.billingAmount || 0), 0) 
    : 0;

  return (
    <div className='bg-[#02101c] h-[200px] rounded-lg py-8 px-20 flex justify-between items-center'>
      <FaMoneyBillWheat className='text-white text-[120px]' />
      <div className='flex flex-col '>
        <p className='text-[25px] font-semibold text-white'>Total Recurring Bills</p>
        <h3 className='text-[45px] font-bold text-white'>$ {totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default TotalBills
