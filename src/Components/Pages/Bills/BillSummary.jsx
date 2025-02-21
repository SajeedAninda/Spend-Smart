import React from 'react'

const BillSummary = () => {
  return (
    <div className='bg-[#cbfdf2]  h-[200px] rounded-lg py-6 px-10'>
      <p className='text-[18px] font-bold text-[#02101c]'>Bills Summary</p>
      <div>
        <div className='flex justify-between mt-5 text-green-700'>
          <p className='text-[16px] font-bold '>Paid Bills</p>
          <p className='text-[16px] font-bold '>5 (Total: $ 450)</p>
        </div>

        <div className='flex justify-between mt-5 text-red-700'>
          <p className='text-[16px] font-bold '>Due Bills</p>
          <p className='text-[16px] font-bold '>2 (Total: $ 410)</p>
        </div>

        <div className='flex justify-between mt-5 text-yellow-700'>
          <p className='text-[16px] font-bold '>Upcoming Bills</p>
          <p className='text-[16px] font-bold '>3 (Total: $ 190)</p>
        </div>
      </div>
    </div>
  )
}

export default BillSummary
