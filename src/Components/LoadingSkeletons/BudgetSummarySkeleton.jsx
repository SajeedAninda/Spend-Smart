import React from 'react'

const BudgetSummarySkeleton = () => {
  return (
    <div className='w-full bg-[#cbfdf2] rounded-lg p-8 animate-pulse'>
      <div className='h-6 w-40 bg-gray-300 rounded mb-4'></div>

      {[1, 2, 3].map(index => (
        <div key={index} className='mb-6'>
          <div className='flex justify-between items-center mb-3'>
            <div className='flex gap-3 items-center'>
              <div className='w-5 h-5 rounded-full bg-gray-300'></div>
              <div className='h-5 w-32 bg-gray-300 rounded'></div>
            </div>
            <div className='flex gap-4'>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-1 items-center'>
              <div className='w-1 h-9 bg-gray-300 rounded-lg'></div>
              <div className='pl-4'>
                <div className='h-4 w-24 bg-gray-300 rounded mb-1'></div>
                <div className='h-4 w-20 bg-gray-300 rounded'></div>
              </div>
            </div>
            <div className='flex flex-1 items-center'>
              <div className='w-1 h-9 bg-gray-300 rounded-lg'></div>
              <div className='pl-4'>
                <div className='h-4 w-24 bg-gray-300 rounded mb-1'></div>
                <div className='h-4 w-20 bg-gray-300 rounded'></div>
              </div>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg mt-4'>
            <div className='flex justify-between items-center'>
              <div className='h-5 w-32 bg-gray-300 rounded'></div>
              <div className='h-4 w-24 bg-gray-300 rounded'></div>
            </div>

            {[1, 2].map(i => (
              <div key={i} className='flex justify-between items-center mt-5'>
                <div className='h-4 w-40 bg-gray-300 rounded'></div>
                <div className='h-4 w-20 bg-gray-300 rounded'></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BudgetSummarySkeleton
