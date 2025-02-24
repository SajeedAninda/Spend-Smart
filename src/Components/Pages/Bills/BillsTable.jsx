import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import { useQuery } from '@tanstack/react-query'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import BillsTableSkeleton from '../../LoadingSkeletons/BillsTableSkeleton'

const BillsTable = ({ refetch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')

  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const {
    data: filteredBills,
    refetch: dataRefetch,
    isLoading
  } = useQuery({
    queryKey: [
      'filteredBills',
      currentUserEmail,
      searchTerm,
      selectedFilterValue
    ],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/allFilteredBills', {
        params: {
          email: currentUserEmail,
          searchTerm,
          selectedFilterValue
        }
      })
      return data
    },
    enabled: !!currentUserEmail
  })

  const handleStatusChange = async bill => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to mark this bill as ${
        bill.billStatus === 'paid' ? 'Unpaid' : 'Paid'
      }.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02101c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const newStatus = bill.billStatus === 'paid' ? 'unpaid' : 'paid'

          await axiosInstance.patch(`/updateBillStatus/${bill._id}`, {
            billStatus: newStatus
          })

          toast.success(
            `Bill marked as ${newStatus.toUpperCase()} successfully!`
          )

          dataRefetch()
          refetch()
        } catch (error) {
          toast.error('Failed to update status. Try again.')
        }
      }
    })
  }

  if (!filteredBills) {
    return <BillsTableSkeleton />
  }

  const handleDeleteBill = async bill => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to Delete this Bill`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02101c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/deleteBill/${bill._id}`)
          toast.success(`Bill deleted successfully!`)
          dataRefetch()
          refetch()
        } catch (error) {
          toast.error('Failed to delete Bill. Try again.')
        }
      }
    })
  }

  return (
    <div>
      <div className='queryDiv flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center'>
        {/* Search Input */}
        <div className='searchField w-full lg:w-[60%]'>
          <input
            className='w-full lg:w-[80%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]'
            placeholder='Search Bills By Name'
            type='text'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              dataRefetch()
            }}
          />
        </div>

        {/* Sort Options */}
        <div className='filterField w-full lg:w-[40%] flex gap-4 justify-center items-center'>
          <div className='sortingField flex items-center gap-4'>
            <p className='text-[14px] font-semibold text-[#02101c]'>Sort By</p>
            <Select
              value={selectedFilterValue}
              onValueChange={value => {
                setSelectedFilterValue(value)
                dataRefetch()
              }}
            >
              <SelectTrigger className='w-[180px] border-2 border-[#02101c]'>
                <SelectValue placeholder='Select an option' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='latest'>Latest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
                <SelectItem value='highest'>Highest</SelectItem>
                <SelectItem value='lowest'>Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className='w-full py-12'>
        <div className='hidden md:grid grid-cols-12 items-center border-b border-gray-400 py-3'>
          <div className='text-[#02101c] text-[16px] font-bold col-span-3'>
            Bill Name
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Bill Status
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Due Date
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Billing Amount
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Change Status
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-1'>
            Delete Bill
          </div>
        </div>

        {filteredBills?.map(bill => {
          const amountClass =
            bill.billStatus === 'paid' ? 'text-green-600' : 'text-red-600'

          return (
            <div
              key={bill._id}
              className='grid grid-cols-1 md:grid-cols-12 items-center border-b border-gray-300 py-3'
            >
              <div className='md:hidden px-4 space-y-2'>
                <div className='text-[#02101c] text-[14px] font-bold'>
                  {bill.billNameText}
                </div>
                <div
                  className={`text-[14px] font-bold capitalize ${amountClass}`}
                >
                  Status: {bill.billStatus}
                </div>
              </div>

              <div className='hidden md:block text-[#02101c] text-[14px] font-bold col-span-3 py-4 pl-4'>
                {bill.billNameText}
              </div>

              <div className='hidden md:block text-[14px] font-bold col-span-2 capitalize'>
                {bill.billStatus}
              </div>

              <div className='md:hidden px-4 mt-2 space-y-2'>
                <div className='text-[#02101c] text-[12px] font-semibold'>
                  Due Date: {bill.billDueDay}th of this Month
                </div>
                <div className={`text-[12px] font-bold ${amountClass}`}>
                  Amount: $ {parseFloat(bill.billingAmount).toFixed(2)}
                </div>
              </div>

              <div className='hidden md:block text-[#02101c] text-[14px] font-semibold col-span-2'>
                {bill.billDueDay}th of this Month
              </div>

              <div
                className={`hidden md:block text-[14px] font-bold col-span-2 ${amountClass}`}
              >
                $ {parseFloat(bill.billingAmount).toFixed(2)}
              </div>

              <div className='md:hidden px-4 mt-2 flex justify-between'>
                <button
                  onClick={() => handleStatusChange(bill)}
                  className={`px-4 py-2 capitalize rounded-lg hover:opacity-35 text-[#fff] font-bold ${
                    bill.billStatus === 'paid' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {bill.billStatus}
                </button>
                <button
                  onClick={() => handleDeleteBill(bill)}
                  className={`px-4 py-2 capitalize rounded-lg hover:opacity-35 text-[#fff] font-bold bg-red-600`}
                >
                  <FaTrash className='text-white font-bold text-[20px]' />
                </button>
              </div>

              <div className='hidden md:block col-span-2'>
                <button
                  onClick={() => handleStatusChange(bill)}
                  className={`px-4 py-2 capitalize rounded-lg hover:opacity-35 text-[#fff] font-bold ${
                    bill.billStatus === 'paid' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {bill.billStatus}
                </button>
              </div>

              <div className='hidden md:block col-span-1'>
                <button
                  onClick={() => handleDeleteBill(bill)}
                  className={`px-4 py-2 capitalize rounded-lg hover:opacity-35 text-[#fff] font-bold bg-red-600`}
                >
                  <FaTrash className='text-white font-bold text-[20px]' />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillsTable
