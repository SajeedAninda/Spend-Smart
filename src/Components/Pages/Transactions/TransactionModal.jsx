import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
  let [transactionNameText, setTransactionNameText] = useState(0)

  if (!isOpen) return null

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
            Add New Transaction
          </h1>
          <form className='mt-4'>
            <div>
              <label className='text-[14px]' htmlFor='transactionName'>
                Transaction Name
              </label>
              <input
                onChange={e => {
                  setTransactionNameText(e.target.value.length)
                }}
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: Paid for Cat Food'
                type='text'
                name='transactionName'
                id='transactionName'
                maxLength={30}
              />
            </div>
            <p className='mt-2 text-right'>
              {30 - transactionNameText} characters left
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
