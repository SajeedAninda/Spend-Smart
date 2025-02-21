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

const BillsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')

  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const {
    data: filteredBills,
    refetch,
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

  return (
    <div>
      <div className='queryDiv flex justify-between items-center'>
        {/* Search Input */}
        <div className='searchField w-[60%]'>
          <input
            className='w-[80%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]'
            placeholder='Search Bills By Name'
            type='text'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              refetch()
            }}
          />
        </div>

        {/* Sort Options */}
        <div className='filterField w-[40%] flex gap-4 justify-center items-center'>
          <div className='sortingField flex items-center gap-4'>
            <p className='text-[14px] font-semibold text-[#02101c]'>Sort By</p>
            <Select
              value={selectedFilterValue}
              onValueChange={value => {
                setSelectedFilterValue(value)
                refetch()
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
      <div className='w-full mt-10'>
        <div className='tableHeader grid grid-cols-12 items-center border-b border-gray-400'>
          <div className='text-[#02101c] text-[16px] font-bold col-span-4 py-3'>
            Bill Name
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Bill Status
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
            Due Date
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
            Billing Amount
          </div>
        </div>

        {/* Mapping Bills Data */}
        {filteredBills?.map(bill => {
          const amountClass =
            bill.billStatus === 'paid' ? 'text-green-600' : 'text-red-600'

          return (
            <div
              key={bill._id}
              className='tableRow grid grid-cols-12 items-center border-b border-gray-300'
            >
              <div className='text-[#02101c] text-[14px] font-bold col-span-4 py-4 pl-4'>
                {bill.billNameText}
              </div>
              <div className='text-[#02101c] text-[14px] font-semibold col-span-2 capitalize'>
                {bill.billStatus}
              </div>
              <div className='text-[#02101c] text-[14px] font-semibold col-span-3 flex justify-center'>
                {bill.billDueDay}
              </div>
              <div
                className={`text-[#02101c] text-[14px] font-bold col-span-3 flex justify-center ${amountClass}`}
              >
                $ {parseFloat(bill.billingAmount).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillsTable
