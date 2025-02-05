import React, { useState } from 'react'
import { TbTransactionDollar } from 'react-icons/tb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'

const Transactions = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('general')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const transactionData = {
      transactionName: e.target.transactionName.value,
      amount: e.target.amount.value
    }
    console.log(transactionData)
    setIsModalOpen(false)
  }

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

        <div className='lowerDiv bg-[#cbfdf2] rounded-lg w-full p-8 mt-10'>
          <div className='queryDiv flex justify-between items-center'>
            <div className='searchField w-[40%]'>
              <input
                className='w-[80%] py-3 px-4 rounded-lg border-2 placeholder:text-[14px] border-[#02101c]'
                placeholder='Search Transaction By Name'
                type='text'
              />
            </div>

            <div className='filterField w-[60%] flex gap-4 justify-between items-center'>
              <div className='sortingField flex items-center gap-4'>
                <p className='text-[14px] font-semibold text-[#02101c]'>
                  Sort By
                </p>
                <Select
                  value={selectedFilterValue}
                  onValueChange={setSelectedFilterValue}
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

              <div className='filterField flex items-center gap-4'>
                <p className='text-[14px] font-semibold text-[#02101c]'>
                  Filter By Category
                </p>
                <Select
                  value={selectedCategoryValue}
                  onValueChange={setSelectedCategoryValue}
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
          <TransactionTable />
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Transactions
