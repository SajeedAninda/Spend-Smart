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
import { InfinitySpin } from 'react-loader-spinner'
import TransactionInfoSkeleton from '../../LoadingSkeletons/TransactionInfoSkeleton'

const Transactions = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: allTransactions, isLoading: isTotalLoading } = useQuery({
    queryKey: ['all-transactions', currentUserEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/getTransactions', {
        params: { email: currentUserEmail }
      })
      return data
    },
    enabled: !!currentUserEmail
  })

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

  const totalTransactions = allTransactions
    ?.reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  const totalEarned = allTransactions
    ?.filter(txn => txn.transactionType === 'earned')
    .reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  const totalSpent = allTransactions
    ?.filter(txn => txn.transactionType === 'spent')
    .reduce((acc, txn) => acc + parseFloat(txn.amount), 0)
    .toFixed(2)

  return (
    <div>
      <div className='w-[100%] lg:w-[1150px] px-8 lg:px-0 mx-auto py-8'>
        <div className='upperDiv flex justify-between items-center gap-10 lg:gap-0'>
          <h1 className='text-[20px] md:text-[26px] lg:text-[32px] font-bold text-[#02101c]'>Transactions</h1>
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

        {
  isTotalLoading ? (
    <TransactionInfoSkeleton />
  ) : allTransactions && allTransactions.length > 0 ? (
    // Transaction Summary Cards
    <div className='middleDiv w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center'>
      {/* Total Transactions Card */}
      <div className='bg-gradient-to-r from-[#30e4ba] to-[#1b4f80] py-6 px-10 rounded-lg'>
        <h4 className='text-[16px] font-bold text-[#02101c]'>
          Total Transactions
        </h4>
        <p className='text-[33px] font-bold text-[#02101c]'>
          $ {totalTransactions}
        </p>
      </div>

      {/* Total Earned Card */}
      <div className='bg-gradient-to-r from-[#30e4ba] to-green-600 py-6 px-10 rounded-lg'>
        <h4 className='text-[16px] font-bold text-[#02101c]'>
          Total Earned
        </h4>
        <p className='text-[33px] font-bold text-[#02101c]'>
          $ {totalEarned}
        </p>
      </div>

      {/* Total Spent Card */}
      <div className='bg-gradient-to-r from-[#30e4ba] to-red-600 py-6 px-10 rounded-lg'>
        <h4 className='text-[16px] font-bold text-[#02101c]'>
          Total Spent
        </h4>
        <p className='text-[33px] font-bold text-[#02101c]'>
          $ {totalSpent}
        </p>
      </div>
    </div>
  ) : (
    <div className='middleDiv w-full mt-10 flex justify-center items-center'>
      <p className='text-[20px] font-bold text-[#02101c]'>
        No transactions found. Start by adding a new transaction!
      </p>
    </div>
  )
}

        <div className='lowerDiv bg-[#cbfdf2] rounded-lg w-full p-8 mt-10'>
          <div className='queryDiv flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between items-center'>
            {/* Search Input */}
            <div className='searchField w-full lg:w-[40%]'>
              <input
                className='w-full lg:w-[80%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]'
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
            <div className='filterField w-full lg:w-[60%] flex flex-col lg:flex-row gap-4 justify-between items-center'>
              {/* Sort By */}
              <div className='sortingField w-full flex justify-between lg:justify-center items-center gap-4'>
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
            <div className='h-screen w-full flex mx-auto justify-center text-center'>
              <InfinitySpin
                visible={true}
                width='200'
                color='#30e4ba'
                ariaLabel='infinity-spin-loading'
              />
            </div>
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
