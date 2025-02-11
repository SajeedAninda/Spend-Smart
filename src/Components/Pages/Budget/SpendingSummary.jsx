import React from 'react'

const SpendingSummary = ({ transactionData, budgetData }) => {
  return (
    <div className='p-6'>
      <h3 className='text-[#02101c] font-bold text-[20px]'>Spending Summary</h3>

      <div className='mt-6 space-y-4'>
        {budgetData?.map(budget => {
          const totalSpent = transactionData
            ?.filter(transaction => transaction.category === budget.category)
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)

          return (
            <div key={budget.category} className='flex justify-between items-center pb-4 border-b border-gray-400'>
              <div className='flex items-center'>
                <div className={`w-1 h-6 rounded-lg`} style={{ backgroundColor: budget.colorTheme }}></div>
                <p className='text-[#02101c] font-semibold text-[16px] pl-4 capitalize'>
                  {budget.category}
                </p>
              </div>
              <div className='text-[#02101c]'>
                <span className='font-bold text-[16px] pr-1'>
                  ${totalSpent.toFixed(2)}
                </span>{' '}
                of <span className='font-black pl-1' style={{ color: budget.colorTheme }}>${budget.maxSpendAmount}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpendingSummary
