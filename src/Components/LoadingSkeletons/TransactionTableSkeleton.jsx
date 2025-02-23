import React from 'react';

const TransactionTableSkeleton = () => {
    return (
        <div className='w-full mt-10'>
          <div className='tableHeader grid grid-cols-12 items-center border-b border-gray-400'>
            <div className='text-[#02101c] text-[16px] font-bold col-span-4 py-3'>
              Transaction Name
            </div>
            <div className='text-[#02101c] text-[16px] font-bold col-span-2 '>
              Category
            </div>
            <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center '>
              Transaction Date
            </div>
            <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center '>
              Amount
            </div>
          </div>
    
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='tableRow grid grid-cols-12 items-center animate-pulse'
            >
              <div className='bg-gray-300 h-6 w-3/4 rounded col-span-4 py-4 pl-4'></div>
              <div className='bg-gray-300 h-6 w-3/4 rounded col-span-2 py-3'></div>
              <div className='bg-gray-300 h-6 w-1/2 rounded col-span-3 py-3 flex justify-center'></div>
              <div className='bg-gray-300 h-6 w-1/2 rounded col-span-3 py-3 flex justify-center'></div>
            </div>
          ))}
        </div>
      )
};

export default TransactionTableSkeleton;