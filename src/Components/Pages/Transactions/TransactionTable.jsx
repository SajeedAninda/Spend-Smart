import React from 'react'

const TransactionTable = () => {
  return (
    <div className='w-full mt-10'>
      <div className='tableHeader grid grid-cols-12 items-center border-b border-gray-400'>
        <div className='text-[#02101c] text-[16px] font-bold col-span-4 py-3'>
          Transaction Name
        </div>
        <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
          Category
        </div>
        <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
          Transaction Date
        </div>
        <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
          Amount
        </div>
      </div>

      <div className='tableRow grid grid-cols-12 items-center'>
        <div className='text-[#02101c] text-[14px] font-bold col-span-4 py-4 pl-4'>
          Fuchka Khaisi
        </div>
        <div className='text-[#02101c] text-[14px] font-semibold col-span-2'>
          Foods
        </div>
        <div className='text-[#02101c] text-[14px] font-semibold col-span-3 flex justify-center'>
          05/02/2025
        </div>
        <div className='text-[#02101c] text-[14px] font-semibold col-span-3 flex justify-center'>
          +10.00
        </div>
      </div>
    </div>
  )
}

export default TransactionTable
