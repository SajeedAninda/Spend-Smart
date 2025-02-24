import React, { useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'

const WithdrawMoneyModal = ({ piggyBank, onClose, refetch }) => {
  const availableBalance = parseFloat(piggyBank?.availableBalance) || 0
  const axiosInstance = useAxiosInstance()

  const [withdrawnAmount, setWithdrawnAmount] = useState(0)

  const handleAmountChange = e => {
    let value = parseFloat(e.target.value) || 0
    if (value > availableBalance) value = availableBalance // Prevent overdrawing
    setWithdrawnAmount(value)
  }

  const newTotal = availableBalance - withdrawnAmount
  const progress =
    (newTotal / (parseFloat(piggyBank?.targetSpend) || 1)) * 100 || 0

  const handleWithdrawAmount = async e => {
    e.preventDefault()
    if (withdrawnAmount <= 0) {
      return toast.error('Withdraw amount must be greater than 0!')
    }
    let loadingToast = toast.loading('Withdrawing Money...')

    try {
      const { data } = await axiosInstance.patch(
        `/withdrawMoney/${piggyBank?._id}`,
        { withdrawnAmount }
      )
      if (data.modifiedCount > 0) {
        toast.success('Money Withdrawn Successfully!')
        refetch()
        onClose()
      } else {
        toast.error('No changes made or update failed.')
      }
    } catch (error) {
      toast.error('Error withdrawing money!')
    }
    toast.dismiss(loadingToast)
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white w-[90%] lg:w-[40%] p-6 rounded-lg shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-3 right-3 text-gray-600 hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <div>
          <h1 className='text-[20px] text-[#02101c] font-bold'>
            Withdraw Money From <span>"{piggyBank?.piggyBankName}"</span>
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] font-semibold'>
            Withdraw money from your Piggy Bank. As soon as you hit confirm, the
            balance will be deducted.
          </h3>

          <div>
            <div className='flex justify-between items-center'>
              <p className='text-[#02101c] text-sm '>Total Remaining</p>
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

            <div className='flex justify-between text-[14px] font-bold text-[#02101c] my-2'>
              <span>{progress.toFixed(2)}%</span>
              <span>Available Balance: ${availableBalance.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleWithdrawAmount} className='mt-4'>
            {/* Amount Input */}
            <div>
              <label className='text-[14px]' htmlFor='withdraw_amount'>
                Amount to Withdraw
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder={`Max: $${availableBalance.toFixed(2)}`}
                type='number'
                name='withdraw_amount'
                id='withdraw_amount'
                value={withdrawnAmount}
                onChange={handleAmountChange}
              />
            </div>

            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Withdraw Money
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

export default WithdrawMoneyModal
