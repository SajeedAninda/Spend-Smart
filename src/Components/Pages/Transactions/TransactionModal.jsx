import React from 'react'
import { IoClose } from 'react-icons/io5'

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white w-[400px] p-6 rounded-lg shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className='absolute top-3 right-3 text-gray-600 hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <h2 className='text-xl font-bold mb-4'>Add New Transaction</h2>
        <p className='text-sm text-gray-600 mb-4'>
          Fill in the details below to add a new transaction.
        </p>

        <form onSubmit={onSubmit}>
          <input
            className='w-full p-3 border-2 rounded-md mb-4 border-gray-300'
            type='text'
            name='transactionName'
            placeholder='Transaction Name'
          />
          <input
            className='w-full p-3 border-2 rounded-md mb-4 border-gray-300'
            type='number'
            name='amount'
            placeholder='Amount'
          />
          <button
            className='w-full bg-[#02101c] text-white py-2 rounded-md hover:bg-[#023a6b]'
            type='submit'
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
