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
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const BillModal = ({ isOpen, onClose, refetch }) => {
  const [billNameText, setBillNameText] = useState('')
  const [billingAmount, setBillingAmount] = useState('')
  const [billDueDay, setBillDueDay] = useState('')

  const queryClient = useQueryClient();

  let axiosInstance = useAxiosInstance()
  let { loggedInUser } = useAuth()
  let currentUserEmail = loggedInUser?.email

  let handleSubmit = async e => {
    e.preventDefault()
    const billingDetails = {
      billNameText,
      billDueDay,
      billingAmount,
      currentUserEmail,
      billStatus: 'unpaid'
    }
    let loadingToast = toast.loading('Adding Billing Details...')

    try {
      const { data } = await axiosInstance.post(
        '/addRecurringBill',
        billingDetails
      )

      if (data.insertedId) {
        toast.success('Recurring Bill Added successfully!')
        setBillNameText(0)
        setBillingAmount('')
        setBillDueDay('')
        e.target.reset()
        toast.dismiss(loadingToast)
        refetch()
        queryClient.invalidateQueries({ queryKey: ['filteredBills'] })
        onClose()
      }
    } catch (error) {
      toast.error('Failed to add Bill!')
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
            Add New Recurring Bill
          </h1>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* Bill Name */}
            <div>
              <label className='text-[14px] dark:text-white' htmlFor='billName'>
                Bill Name
              </label>
              <input
                onChange={e => setBillNameText(e.target.value)}
                className='w-full dark:bg-slate-900 dark:placeholder:text-white py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] dark:text-white placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: Monthly Internet Bill'
                type='text'
                name='billName'
                id='billName'
                maxLength={30}
                required
              />
              <p className='mt-2 text-[14px] dark:text-white text-right'>
                {30 - billNameText?.length} characters left
              </p>
            </div>

            {/* Bill Due Date */}
            <div className='mt-1'>
              <label className='text-[14px] dark:text-white' htmlFor='billDueDate'>
                Bill Due Date
              </label>
              <Select onValueChange={setBillDueDay}>
                <SelectTrigger className='w-full mt-3 border border-[#02101c] h-[40px] dark:text-white dark:border-white'>
                  <SelectValue placeholder='Select a day of the month' />
                </SelectTrigger>
                <SelectContent className='max-h-[250px] overflow-y-auto'>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={`${i + 1}`}
                      className='py-2 text-[14px] dark:text-white'
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
              <label className='text-[14px] dark:text-white' htmlFor='billAmount'>
                Bill Amount
              </label>
              <input
                className='w-full dark:bg-slate-900 dark:placeholder:text-white py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] dark:text-white placeholder:text-gray-500 border-[#02101c]'
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
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 dark:border-2 dark:border-white'
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
