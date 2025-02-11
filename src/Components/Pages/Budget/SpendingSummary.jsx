import React from 'react'

const SpendingSummary = ({ transactionData, budgetData }) => {
  return (
    <div className='p-6'>
      <h3 className='text-[#02101c] font-bold text-[20px]'>Spending Summary</h3>

      <div className='spendingSummaries flex justify-between items-center mt-5'>
        <div className='flex items-center'>
          <div className='w-1 h-6 rounded-lg bg-[#717192]'> </div>
          <p className='text-[#02101c] font-medium text-[16px] pl-4'>
            Dining Out
          </p>
        </div>
        <div className='text-[#02101c]'>
            <span className='font-bold text-[18px]'>$ 540.00</span>  of  <span className='font-semibold '>$850</span>
        </div>
      </div>
    </div>
  )
}

export default SpendingSummary
