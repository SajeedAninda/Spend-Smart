import React from 'react'

const BillSummarySkeleton = () => {
  return (
    <div className='bg-[#cbfdf2] h-[200px] rounded-lg py-6 px-10 animate-pulse'>
      <div className='h-5 w-32 bg-gray-300 rounded'></div>

      <div className='mt-6 space-y-5'>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-300 rounded'></div>
          <div className='h-4 w-40 bg-gray-300 rounded'></div>
        </div>

        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-300 rounded'></div>
          <div className='h-4 w-40 bg-gray-300 rounded'></div>
        </div>

        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-300 rounded'></div>
          <div className='h-4 w-40 bg-gray-300 rounded'></div>
        </div>
      </div>
    </div>
  )
}

export default BillSummarySkeleton
