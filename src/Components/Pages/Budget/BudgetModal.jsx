import React, { useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'

const BudgetModal = ({ isOpen, onClose }) => {
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
  const [maxSpend, setMaxSpend] = useState('')
  const [colors, setColors] = useState('')

  if (!isOpen) return null

  const handleSubmit = async e => {
    e.preventDefault()
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
            Add New Budget
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] font-semibold'>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </h3>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* CATEGORY  */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='category'>
                Category
              </label>
              <div className='category mt-2'>
                <Select
                  value={selectedCategoryValue}
                  onValueChange={setSelectedCategoryValue}
                >
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c]'>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='general'>General</SelectItem>
                    <SelectItem value='education'>Education</SelectItem>
                    <SelectItem value='shopping'>Shopping</SelectItem>
                    <SelectItem value='bills'>Bills</SelectItem>
                    <SelectItem value='groceries'>Groceries</SelectItem>
                    <SelectItem value='transportation'>
                      Transportation
                    </SelectItem>
                    <SelectItem value='dining_out'>Dining Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* MAXIMUM SPEND  */}
            <div className=' mt-3'>
              <label className='text-[14px]' htmlFor='max_spend'>
                Maximum Spend
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $180'
                type='number'
                name='max_spend'
                id='max_spend'
                required
                value={maxSpend}
                onChange={e => setMaxSpend(e.target.value)}
              />
            </div>

            {/* COLORS  */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='colors'>
                Choose a Color Theme
              </label>
              <div className='colors mt-2'>
                <Select
                  value={colors}
                  onValueChange={setColors}
                >
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c]'>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='yellow'>Yellow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Submit
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

export default BudgetModal
