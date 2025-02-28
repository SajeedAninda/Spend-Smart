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
import { FaBookmark } from 'react-icons/fa'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'

const TransactionModal = ({ isOpen, onClose, refetch }) => {
  const [date, setDate] = useState(new Date())
  const [transactionNameText, setTransactionNameText] = useState(0)
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
  const [selectedTransactionType, setSelectedTransactionType] = useState('')
  const [amount, setAmount] = useState('')

  let axiosInstance = useAxiosInstance()
  let { loggedInUser } = useAuth()
  let currentUserEmail = loggedInUser?.email

  if (!isOpen) return null

  const handleSubmit = async e => {
    e.preventDefault()

    let name = e.target.transactionName.value
    let amount = e.target.amount.value

    const transactionDetails = {
      transactionName: name,
      transactionDate: date,
      category: selectedCategoryValue,
      amount,
      transactionType: selectedTransactionType,
      userEmail: currentUserEmail
    }

    let loadingToast = toast.loading('Add Transaction...')

    try {
      const { data } = await axiosInstance.post(
        '/addTransaction',
        transactionDetails
      )

      if (data.insertedId) {
        toast.success('Transaction added successfully!')
        setTransactionNameText(0)
        setDate(new Date())
        setSelectedCategoryValue('general')
        setSelectedTransactionType('')
        e.target.reset()
        toast.dismiss(loadingToast)
        setAmount('')
        onClose()
        refetch()
      }
    } catch (error) {
      toast.error('Failed to add transaction!')
    }
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
            Add New Transaction
          </h1>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* TRANSACTION TEXT  */}
            <div>
              <label
                className='text-[14px] dark:text-white'
                htmlFor='transactionName'
              >
                Transaction Name
              </label>
              <input
                onChange={e => {
                  setTransactionNameText(e.target.value.length)
                }}
                className='w-full py-3 px-4 dark:bg-slate-900 dark:placeholder:text-white rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: Paid for Cat Food'
                type='text'
                name='transactionName'
                id='transactionName'
                maxLength={30}
                required
              />
              <p className='mt-2 text-[14px] dark:text-white text-right'>
                {30 - transactionNameText} characters left
              </p>
            </div>

            {/* TRANSACTION DATE  */}
            <div>
              <label
                className='text-[14px] dark:text-white'
                htmlFor='transactionDate'
              >
                Transaction Date
              </label>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full mt-3 border border-[#02101c] dark:border-white dark:bg-slate-900 hover:bg-[#cbfdf2] h-[40px] justify-center text-center py-3 font-normal dark:text-white',
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
              <label className='text-[14px] dark:text-white' htmlFor='category'>
                Category
              </label>
              <div className='category mt-2'>
                <Select
                  value={selectedCategoryValue}
                  onValueChange={setSelectedCategoryValue}
                >
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c] dark:border-white dark:text-white'>
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
              <label className='text-[14px] dark:text-white' htmlFor='amount'>
                Amount
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg dark:bg-slate-900 dark:placeholder:text-white border mt-2 placeholder:text-[14px] dark:placeholder:dark:text-white placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $180'
                type='number'
                name='amount'
                id='amount'
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            {/* SPEND / EARNED  */}
            <div className='mt-3'>
              <label
                className='text-[14px] dark:text-white'
                htmlFor='spentOrEarned'
              >
                SPENT / EARNED
              </label>
              <div
                className={`category mt-2 rounded-lg ${
                  selectedTransactionType === 'earned'
                    ? 'bg-green-500'
                    : selectedTransactionType === 'spent'
                    ? 'bg-red-500'
                    : 'bg-white'
                }`}
              >
                <Select
                  value={selectedTransactionType}
                  onValueChange={setSelectedTransactionType}
                >
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c]'>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='earned'>Earned</SelectItem>
                    <SelectItem value='spent'>Spent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out dark:border-2 dark:border-white hover:scale-105 active:scale-95'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

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

export default TransactionModal
