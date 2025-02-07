import React, { useState } from 'react'
import { TbTransactionDollar } from 'react-icons/tb'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../Hooks/useAuth'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'
import useAxiosInstance from '../../Hooks/useAxiosInstance'

const Transactions = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: transactions,
    refetch,
    isLoading
  } = useQuery({
    queryKey: [
      'transactions',
      currentUserEmail,
      searchTerm,
      selectedFilterValue,
      selectedCategoryValue
    ],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/transactions', {
        params: {
          email: currentUserEmail,
          searchTerm,
          selectedFilterValue,
          selectedCategoryValue
        }
      })
      return data
    },
    enabled: !!currentUserEmail
  })

  console.log(transactions)

  const totalTransactions = transactions
    .reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  const totalEarned = transactions
    .filter(txn => txn.transactionType === 'earned')
    .reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  const totalSpent = transactions
    .filter(txn => txn.transactionType === 'spent')
    .reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  return (
    <div>
      <div className='w-[1150px] mx-auto py-8'>
        <div className='upperDiv flex justify-between items-center'>
          <h1 className='text-[32px] font-bold text-[#02101c]'>Transactions</h1>
          <div className='relative group'>
            <button
              className='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
              onClick={() => setIsModalOpen(true)}
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Add New Transaction
                  </span>
                  <TbTransactionDollar className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </div>
        </div>

        <div className='middleDiv w-full mt-10 grid grid-cols-3 gap-6 items-center'>
          <div className='bg-gradient-to-r from-[#30e4ba] to-[#1b4f80] py-6 px-10 rounded-lg'>
            <h4 className='text-[16px] font-bold text-[#02101c]'>
              Total Transactions
            </h4>
            <p className='text-[33px] font-bold text-[#02101c]'>
              $ {totalTransactions}
            </p>
          </div>

          <div className='bg-gradient-to-r from-[#30e4ba] to-green-600 py-6 px-10 rounded-lg'>
            <h4 className='text-[16px] font-bold text-[#02101c]'>
              Total Earned
            </h4>
            <p className='text-[33px] font-bold text-[#02101c]'>
              $ {totalEarned}
            </p>
          </div>

          <div className='bg-gradient-to-r from-[#30e4ba] to-red-600 py-6 px-10 rounded-lg'>
            <h4 className='text-[16px] font-bold text-[#02101c]'>
              Total Spent
            </h4>
            <p className='text-[33px] font-bold text-[#02101c]'>
              $ {totalSpent}
            </p>
          </div>
        </div>

        <div className='lowerDiv bg-[#cbfdf2] rounded-lg w-full p-8 mt-10'>
          <div className='queryDiv flex justify-between items-center'>
            {/* Search Input */}
            <div className='searchField w-[40%]'>
              <input
                className='w-[80%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]'
                placeholder='Search Transaction By Name'
                type='text'
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  refetch()
                }}
              />
            </div>

            {/* Sort & Filter Options */}
            <div className='filterField w-[60%] flex gap-4 justify-between items-center'>
              {/* Sort By */}
              <div className='sortingField flex items-center gap-4'>
                <p className='text-[14px] font-semibold text-[#02101c]'>
                  Sort By
                </p>
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

              {/* Filter By Category */}
              <div className='filterField flex items-center gap-4'>
                <p className='text-[14px] font-semibold text-[#02101c]'>
                  Filter By Category
                </p>
                <Select
                  value={selectedCategoryValue}
                  onValueChange={value => {
                    setSelectedCategoryValue(value)
                    refetch()
                  }}
                >
                  <SelectTrigger className='w-[180px] border-2 border-[#02101c]'>
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
          </div>

          {isLoading ? (
            <p>Loading transactions...</p>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        refetch={refetch}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Transactions
