import React from 'react'

const PiggyBankCardSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
      {[1, 2, 3, 4].map(index => (
        <div
          key={index}
          className='space-y-4 px-8 py-7 bg-[#cbfdf2] rounded-xl shadow-md animate-pulse'
        >
          <div className='flex justify-between items-center pb-3'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full bg-gray-300'></div>
              <div className='h-6 w-32 bg-gray-300 rounded'></div>
            </div>
            <div className='flex gap-4'>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
            </div>
          </div>

          <div>
            <div className='flex justify-between items-center'>
              <div className='h-4 w-20 bg-gray-300 rounded'></div>
              <div className='h-8 w-28 bg-gray-300 rounded'></div>
            </div>

            <div className='relative h-2 w-full my-6 rounded-lg overflow-hidden bg-gray-300'>
              <div className='h-full bg-gray-400 w-2/3 rounded-lg'></div>
            </div>

            <div className='flex justify-between text-[14px] font-bold text-gray-400 my-2'>
              <div className='h-4 w-12 bg-gray-300 rounded'></div>
              <div className='h-4 w-24 bg-gray-300 rounded'></div>
            </div>
          </div>

          <div className='flex mt-10 items-center gap-4 w-full'>
            <div className='h-10 w-full bg-gray-300 rounded-lg'></div>
            <div className='h-10 w-full bg-gray-300 rounded-lg'></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PiggyBankCardSkeleton
