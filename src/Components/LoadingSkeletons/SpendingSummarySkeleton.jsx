import React from 'react'

const SpendingSummarySkeleton = () => {
  return (
    <div className='p-6'>
      <div className='h-6 w-40 bg-gray-300 animate-pulse rounded'></div> {/* Title Skeleton */}

      <div className='mt-6 space-y-4'>
        {[...Array(3)].map((_, index) => ( // Simulating 3 rows
          <div key={index} className='flex justify-between items-center pb-4 border-b border-gray-400'>
            <div className='flex items-center'>
              <div className='w-1 h-6 bg-gray-300 animate-pulse rounded-lg'></div>
              <div className='ml-4 h-5 w-32 bg-gray-300 animate-pulse rounded'></div>
            </div>
            <div className='h-5 w-28 bg-gray-300 animate-pulse rounded'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpendingSummarySkeleton
