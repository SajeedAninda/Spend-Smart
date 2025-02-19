import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaBookmark } from 'react-icons/fa'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'

const BillModal = ({ isOpen, onClose }) => {
  const [billNameText, setBillNameText] = useState(0)
  const [billingAmount, setBillingAmount] = useState('')
  const [billDueDay, setBillDueDay] = useState('') 

  let handleSubmit = e => {
    e.preventDefault()
    console.log({ billDueDay, billingAmount })
  }

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
            Add New Recurring Bill
          </h1>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* Bill Name */}
            <div>
              <label className='text-[14px]' htmlFor='billName'>
                Bill Name
              </label>
              <input
                onChange={e => setBillNameText(e.target.value.length)}
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: Monthly Internet Bill'
                type='text'
                name='billName'
                id='billName'
                maxLength={30}
                required
              />
              <p className='mt-2 text-[14px] text-right'>
                {30 - billNameText} characters left
              </p>
            </div>

            {/* Bill Due Date */}
            <div className='mt-1'>
              <label className='text-[14px]' htmlFor='billDueDate'>
                Bill Due Date
              </label>
              <Select onValueChange={setBillDueDay}>
                <SelectTrigger className='w-full mt-3 border border-[#02101c] h-[40px]'>
                  <SelectValue placeholder='Select a day of the month' />
                </SelectTrigger>
                <SelectContent className='max-h-[250px] overflow-y-auto'>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={`${i + 1}`}
                      className='py-2 text-[14px]'
                    >
                      {`${i + 1}${
                        i + 1 === 1
                          ? 'st'
                          : i + 1 === 2
                          ? 'nd'
                          : i + 1 === 3
                          ? 'rd'
                          : 'th'
                      } of Month`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bill Amount */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='billAmount'>
                Bill Amount
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $180'
                type='number'
                name='billAmount'
                id='billAmount'
                required
                value={billingAmount}
                onChange={e => setBillingAmount(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Submit
                  </span>
                  <FaBookmark className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BillModal
