import React, { useEffect, useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'

const AddMoneyModal = ({ piggyBank, onClose, refetch }) => {
  const targetSpend = parseFloat(piggyBank?.targetSpend) || 0
  const availableBalance = parseFloat(piggyBank?.availableBalance) || 0
  const maxAddableAmount = targetSpend - availableBalance
  const axiosInstance = useAxiosInstance()

  const [addedAmount, setAddedAmount] = useState(0)

  const handleAmountChange = e => {
    let value = parseFloat(e.target.value) || 0
    if (value > maxAddableAmount) value = maxAddableAmount
    setAddedAmount(value)
  }

  const newTotal = availableBalance + addedAmount
  const progress = (newTotal / targetSpend) * 100 || 0

  const handleAddAmount = async e => {
    e.preventDefault()
    if (!addedAmount) {
      return toast.error('Please Type Amount!')
    }
    let loadingToast = toast.loading('Adding Money...')

    try {
      const { data } = await axiosInstance.patch(
        `/addMoney/${piggyBank?._id}`,
        {
          addedAmount
        }
      )
      if (data.modifiedCount > 0) {
        toast.success('Money Added Succesfully!')
        refetch()
        onClose()
      } else {
        toast.error('No changes made or update failed.')
      }
    } catch (error) {
      toast.error('Error adding Money!')
    }
    toast.dismiss(loadingToast)
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        data-aos='fade-up'
        className='bg-white dark:bg-[#02101c] w-[90%] lg:w-[40%] p-6 rounded-lg shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-3 right-3 text-gray-600 dark:text-white hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div>
          <h1 className='text-[20px] text-[#02101c] dark:text-white font-bold'>
            Add Money to <span>"{piggyBank?.piggyBankName}"</span>
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] dark:text-white font-semibold'>
            Add money to your Piggy Bank to reach your target. As soon as you
            hit confirm, the balance will be added to your Piggy Bank. The
            summation of money cannot be more than the targeted amount.
          </h3>

          <div>
            <div className='flex justify-between items-center'>
              <p className='text-[#02101c] dark:text-white text-sm '>Total Saved</p>
              <h2
                style={{ color: piggyBank?.colorTheme }}
                className='text-3xl font-bold '
              >
                ${newTotal.toFixed(2)}
              </h2>
            </div>

            <div
              className='relative h-2 w-full my-6 rounded-lg overflow-hidden'
              style={{ backgroundColor: `${piggyBank?.colorTheme}70` }}
            >
              <div
                className='h-full rounded-lg'
                style={{
                  width: `${progress}%`,
                  backgroundColor: piggyBank?.colorTheme
                }}
              />
            </div>

            <div className='flex justify-between text-[14px] font-bold text-[#02101c] dark:text-white my-2'>
              <span>{progress.toFixed(2)}%</span>
              <span>Target of ${targetSpend}</span>
            </div>
          </div>

          <form onSubmit={handleAddAmount} className='mt-4'>
            {/* Amount Input */}
            <div>
              <label className='text-[14px] dark:text-white' htmlFor='max_spend'>
                Amount to Add
              </label>
              <input
                className='w-full dark:bg-slate-900 dark:placeholder:text-white dark:text-white py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder={`Max: $${maxAddableAmount.toFixed(2)}`}
                type='number'
                name='max_spend'
                id='max_spend'
                value={addedAmount}
                onChange={handleAmountChange}
              />
            </div>

            <button
              type='submit'
              className='relative dark:border-2 dark:border-white mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
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
