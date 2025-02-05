import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { Calendar } from '../../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState(new Date())
  const [transactionNameText, setTransactionNameText] = useState(0)
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')

  console.log(transactionNameText, date)

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
            {/* TRANSACTION TEXT  */}
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
                required
              />
              <p className='mt-2 text-[14px] text-right'>
                {30 - transactionNameText} characters left
              </p>
            </div>
            {/* TRANSACTION DATE  */}
            <div>
              <label className='text-[14px]' htmlFor='transactionName'>
                Transaction Date
              </label>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full mt-3 border border-[#02101c] hover:bg-[#cbfdf2] h-[40px] justify-center text-center py-3 font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align='start'
                  className='flex w-auto flex-col space-y-2 p-2'
                >
                  <Select
                    onValueChange={value =>
                      setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      <SelectItem value='0'>Today</SelectItem>
                      <SelectItem value='1'>Tomorrow</SelectItem>
                      <SelectItem value='3'>In 3 days</SelectItem>
                      <SelectItem value='7'>In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className='rounded-md border'>
                    <Calendar
                      mode='single'
                      selected={date}
                      onSelect={setDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* CATEGORY  */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='transactionName'>
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

            {/* AMOUNT  */}
            <div className=' mt-3'>
              <label className='text-[14px]' htmlFor='amount'>
                Amount
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $180'
                type='number'
                name='amount'
                id='amount'
                required
              />
            </div>

            {/* SPEND / EARNED  */}
            {/* CATEGORY  */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='spentOrEarned'>
                SPENT / EARNED
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
