import React from 'react'

const BillsTableSkeleton = () => {
  return (
    <div className='w-full py-12 animate-pulse'>
      <div className='grid grid-cols-12 items-center border-b border-gray-400 py-3'>
        {[
          'Bill Name',
          'Bill Status',
          'Due Date',
          'Billing Amount',
          'Change Status',
          'Delete Bill'
        ].map((header, index) => (
          <div
            key={index}
            className='text-gray-400 text-[16px] font-bold col-span-2 flex justify-center'
          >
            {header}
          </div>
        ))}
      </div>

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className='grid grid-cols-12 items-center border-b border-gray-300 py-3'
        >
          <div className='col-span-3 flex justify-center'>
            <div className='h-6 w-24 bg-gray-300 rounded'></div>
          </div>
          <div className='col-span-2 flex justify-center'>
            <div className='h-6 w-16 bg-gray-300 rounded'></div>
          </div>
          <div className='col-span-2 flex justify-center'>
            <div className='h-6 w-20 bg-gray-300 rounded'></div>
          </div>
          <div className='col-span-2 flex justify-center'>
            <div className='h-6 w-20 bg-gray-300 rounded'></div>
          </div>
          <div className='col-span-2 flex justify-center'>
            <div className='h-8 w-24 bg-gray-300 rounded'></div>
          </div>
          <div className='col-span-1 flex justify-center'>
            <div className='h-8 w-8 bg-gray-300 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BillsTableSkeleton
