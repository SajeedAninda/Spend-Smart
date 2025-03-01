import useAxiosInstance from '../../Hooks/useAxiosInstance'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { MdEditSquare } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import UpdateBudgetModal from './UpdateBudgetModal'
import BudgetSummarySkeleton from '../../LoadingSkeletons/BudgetSummarySkeleton'

const formatDate = dateString => {
  const date = new Date(dateString)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('en-GB', options).replace(',', '')
}

const BudgetSummary = ({ transactionData, budgetData, refetch }) => {
  let axiosInstance = useAxiosInstance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(null)

  let handleBudgetDelete = async id => {
    Swal.fire({
      title: 'Do you want to delete this budget?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02101c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const { data } = await axiosInstance.delete(`/budgetDelete/${id}`)
        if (data.deletedCount > 0) {
          refetch()
          toast.success('Deleted!', 'Your budget has been deleted.')
        } else {
          toast.error('Error!', 'Failed to delete budget.')
        }
      }
    })
  }

  let handleBudgetUpdate = budget => {
    setSelectedBudget(budget)
    setIsModalOpen(true)
  }

  if (!budgetData || !transactionData) {
    return <BudgetSummarySkeleton />
  }

  return (
    <div className='w-full bg-[#cbfdf2] dark:bg-[#125042] rounded-lg p-8'>
      {budgetData?.map(budget => {
          const totalSpent = transactionData
            ?.filter(transaction => 
              transaction.category === budget.category && transaction.transactionType === 'spent'
            )
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0)

        const latestTransactions = transactionData
          ?.filter(t => t?.category === budget?.category)
          ?.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
          ?.slice(0, 3)

        return (
          <div key={budget?.category} className='mb-6'>
            <div className='topPortion flex justify-between items-start'>
              <div>
                <div className='flex gap-3 items-center'>
                  <div
                    className='w-5 h-5 rounded-full'
                    style={{ backgroundColor: budget?.colorTheme }}
                  ></div>
                  <h3 className='text-[#02101c] dark:text-white font-bold text-[20px] capitalize'>
                    {budget?.category || 'Unknown'}
                  </h3>
                </div>
                <p className='mt-3 text-[#02101c] dark:text-white font-semibold'>
                  Maximum of ${budget?.maxSpendAmount || 0}
                </p>
              </div>

              <div className='flex gap-4 items-center'>
                <div
                  onClick={() => {
                    handleBudgetUpdate(budget)
                  }}
                >
                  <MdEditSquare className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-[#02101c] dark:text-white' />
                </div>
                <div
                  onClick={() => {
                    handleBudgetDelete(budget?._id)
                  }}
                >
                  <RiDeleteBin7Fill className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-red-600' />
                </div>
              </div>
            </div>

            <div className='mt-4 flex justify-between items-center'>
              <div className='flex flex-1 items-center'>
                <div
                  className='w-1 h-9 rounded-lg'
                  style={{ backgroundColor: budget?.colorTheme }}
                ></div>
                <div className='pl-4'>
                  <p className='text-[#02101c] dark:text-white font-semibold text-[14px] capitalize'>
                    Total Budget
                  </p>
                  <p className='text-[#02101c] dark:text-white font-semibold text-[14px] capitalize'>
                    ${budget?.maxSpendAmount || 0}
                  </p>
                </div>
              </div>
              <div className='flex flex-1 items-center'>
                <div className='w-1 h-9 rounded-lg bg-white'></div>
                <div className='pl-4'>
                  <p className='text-[#02101c] dark:text-white font-semibold text-[14px] capitalize'>
                    Total Spent
                  </p>
                  <p className='text-[#02101c] dark:text-white font-semibold text-[14px] capitalize'>
                    ${totalSpent}
                  </p>
                </div>
              </div>
            </div>

            <div className='latestSpending bg-white dark:bg-[#102e27] p-6 rounded-lg mt-4'>
              <div className='flex justify-between items-center'>
                <h3 className='text-[#02101c] dark:text-white font-semibold text-[18px]'>
                  Latest Transactions
                </h3>
                <Link
                  to={'/transactions'}
                  className='flex gap-1 items-center hover:underline text-[15px] dark:text-white'
                >
                  All Transactions{' '}
                  <IoIosArrowRoundForward className='text-[#02101c] dark:text-white font-bold text-[25px]' />
                </Link>
              </div>

              {latestTransactions?.length > 0 ? (
                latestTransactions?.map(transaction => (
                  <Link
                    key={transaction?._id}
                    to={'/transactions'}
                    className='flex p-2 rounded-lg cursor-pointer mt-5 justify-between items-center hover:bg-slate-200'
                  >
                    <p className='text-[#02101c] dark:text-white font-semibold text-[16px]'>
                      {transaction?.transactionName || 'Unnamed Transaction'}
                    </p>
                    <div className='flex flex-col items-center'>
                      <p
                        className={`${
                          transaction?.transactionType === 'spent'
                            ? 'text-red-600'
                            : 'text-green-600'
                        } font-semibold text-[16px]`}
                      >
                        {transaction?.transactionType === 'spent' ? '-' : '+'}$
                        {transaction?.amount || 0}
                      </p>
                      <p className='text-gray font-semibold text-[12px] dark:text-white'>
                        {formatDate(transaction?.transactionDate)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className='text-gray-500 text-[14px] mt-3'>
                  No transactions yet.
                </p>
              )}
            </div>
          </div>
        )
      })}

      {isModalOpen && (
        <UpdateBudgetModal
          budget={selectedBudget}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default BudgetSummary
