import React, { useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'

const AddMoneyModal = ({ piggyBank, onClose, refetch }) => {
  const [addedAmount, setAddedAmount] = useState(0)
  const progress = (piggyBank?.availableBalance / piggyBank?.targetSpend) * 100

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white w-[40%] p-6 rounded-lg shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-3 right-3 text-gray-600 hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div>
          <h1 className='text-[20px] text-[#02101c] font-bold'>
            Add Money to <span>"{piggyBank?.piggyBankName}"</span>
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] font-semibold'>
            Add money to your Piggy Bank to reach your target. As soon as hit
            confirm, The Balance will be added to your Piggy Bank. The summation
            of money cannot be more than targeted amount.
          </h3>

          <div>
            <div className='flex justify-between items-center'>
              <p className='text-[#02101c] text-sm '>Total Saved</p>
              <h2
                style={{
                  color: piggyBank?.colorTheme
                }}
                className='text-3xl font-bold '
              >
                ${piggyBank?.availableBalance.toFixed(2)}
              </h2>
            </div>
            <div
              className='relative h-2 w-full my-6 rounded-lg overflow-hidden'
              style={{
                backgroundColor: `${piggyBank?.colorTheme}70`
              }}
            >
              <div
                className='h-full rounded-lg'
                style={{
                  width: `${progress}%`,
                  backgroundColor: piggyBank?.colorTheme
                }}
              />
            </div>

            <div className='flex justify-between text-[14px] font-bold text-[#02101c] my-2'>
              <span>{progress.toFixed(2)}%</span>
              <span>Target of ${piggyBank?.targetSpend}</span>
            </div>
          </div>

          <form className='mt-4'>
            {/* Target Amount  */}
            <div className=''>
              <label className='text-[14px]' htmlFor='max_spend'>
                Amount to Add
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $2000'
                type='number'
                name='max_spend'
                id='max_spend'
                required
                onChange={e => setAddedAmount(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Add Money
                  </span>
                  <IoCheckmarkDoneCircle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMoneyModal
