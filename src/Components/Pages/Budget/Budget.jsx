import React, { useState } from 'react'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import BudgetModal from './BudgetModal'
import BudgetPieChart from './BudgetPieChart'
import { useQuery } from '@tanstack/react-query'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import SpendingSummary from './SpendingSummary'
import BudgetSummary from './BudgetSummary'
import { InfinitySpin } from 'react-loader-spinner'

const Budget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  let axiosInstance = useAxiosInstance()
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email

  const {
    data: budgets,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['budgets', currentUserEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/budgets', {
        params: {
          email: currentUserEmail
        }
      })
      return data
    },
    enabled: !!currentUserEmail
  })

  const { data: transactions } = useQuery({
    queryKey: ['transactions', currentUserEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/getTransactions', {
        params: {
          email: currentUserEmail
        }
      })
      return data
    },
    enabled: !!currentUserEmail
  })

  return (
    <div className='w-[100%] lg:w-[1150px] px-8 lg:px-0 mx-auto py-8'>
      <div className='upperDiv flex justify-between items-center'>
        <h1 className='text-[32px] font-bold text-[#02101c]'>Budgets</h1>
        <div className='relative group'>
          <button
            className='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            onClick={() => setIsModalOpen(true)}
          >
            <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

            <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
              <div className='relative z-10 flex items-center space-x-2'>
                <span className='transition-all duration-500 group-hover:translate-x-1'>
                  Add a Budget
                </span>
                <RiMoneyDollarBoxFill className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
              </div>
            </span>
          </button>
        </div>
      </div>

      <div className='summaryDiv flex flex-col lg:flex-row w-full justify-between gap-10 mt-10'>
        {isLoading ? (
          <div className='w-full flex justify-center items-center'>
            <InfinitySpin
              visible={true}
              width='200'
              color='#30e4ba'
              ariaLabel='infinity-spin-loading'
            />
          </div>
        ) : budgets && budgets.length > 0 ? (
          <>
            <div className='spendingSummary w-full lg:w-[35%] h-fit pb-6 bg-[#cbfdf2] rounded-lg'>
              <BudgetPieChart
                transactionData={transactions}
                budgetData={budgets}
              ></BudgetPieChart>
              <SpendingSummary
                transactionData={transactions}
                budgetData={budgets}
              ></SpendingSummary>
            </div>

            <div className='w-full lg:w-[65%]'>
              <BudgetSummary
                transactionData={transactions}
                budgetData={budgets}
                refetch={refetch}
              ></BudgetSummary>
            </div>
          </>
        ) : (
          <div className='w-full flex justify-center items-center'>
            <p className='text-[20px] font-bold text-[#02101c]'>
              No budgets found. Start by adding a new budget!
            </p>
          </div>
        )}
      </div>
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      ></BudgetModal>
    </div>
  )
}

export default Budget
