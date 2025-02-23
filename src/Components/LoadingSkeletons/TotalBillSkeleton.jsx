import React from 'react'

const TotalBillsSkeleton = () => {
  return (
    <div className='bg-[#02101c] h-[200px] rounded-lg py-8 px-20 flex justify-between items-center animate-pulse'>
      <div className='w-[120px] h-[120px] bg-gray-600 rounded'></div>

      <div className='flex flex-col space-y-3'>
        <div className='h-6 w-52 bg-gray-600 rounded'></div>
        <div className='h-10 w-32 bg-gray-600 rounded'></div>
      </div>
    </div>
  )
}

export default TotalBillsSkeleton
