import React, { useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from '../../ui/select'

const PiggyModal = ({ isOpen, onClose }) => {
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
    const [piggyBankName, setPiggyBankName] = useState(0)
  const [targetSpend, setTargetSpend] = useState('')
  const [colors, setColors] = useState('')

  if (!isOpen) return null

  const colorOptions = [
    { name: 'Dark Yellow', code: '#B8860B' },
    { name: 'Royal Blue', code: '#4169E1' },
    { name: 'Crimson Red', code: '#DC143C' },
    { name: 'Emerald Green', code: '#50C878' },
    { name: 'Sunset Orange', code: '#FF4500' },
    { name: 'Deep Purple', code: '#800080' },
    { name: 'Midnight Blue', code: '#191970' },
    { name: 'Charcoal Gray', code: '#36454F' },
    { name: 'Dark Magenta', code: '#8B008B' },
    { name: 'Dark Turquoise', code: '#008B8B' }
  ]

  let handleSubmit = e => {}

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
            Add New Piggy Bank
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] font-semibold'>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </h3>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* PIGGY BANK NAME  */}
            <div>
              <label className='text-[14px]' htmlFor='transactionName'>
                Piggy Bank Name
              </label>
              <input
                onChange={e => {
                  setPiggyBankName(e.target.value.length)
                }}
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: Trip to Europe'
                type='text'
                name='transactionName'
                id='transactionName'
                maxLength={30}
                required
              />
              <p className='mt-2 text-[14px] text-right'>
                {30 - piggyBankName} characters left
              </p>
            </div>

            {/* Target Amount  */}
            <div className=''>
              <label className='text-[14px]' htmlFor='max_spend'>
                Target Amount
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $2000'
                type='number'
                name='max_spend'
                id='max_spend'
                required
                value={targetSpend}
                onChange={e => setTargetSpend(e.target.value)}
              />
            </div>

            {/* COLORS  */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='colors'>
                Choose a Color Theme
              </label>
              <div className='colors mt-2'>
                <Select value={colors} onValueChange={setColors}>
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c]'>
                    <SelectValue placeholder='Select a color' />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.code} value={color.code}>
                        <div className='flex items-center gap-2'>
                          <span
                            className='w-5 h-5 rounded-full border'
                            style={{ backgroundColor: color.code }}
                          ></span>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
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

export default PiggyModal
