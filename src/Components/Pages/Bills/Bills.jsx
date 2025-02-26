import React, { useState } from 'react'
import { RiBillFill } from 'react-icons/ri'
import BillModal from './BillModal'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import useAuth from '../../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import TotalBills from './TotalBills'
import BillSummary from './BillSummary'
import BillsTable from './BillsTable'
import { InfinitySpin } from 'react-loader-spinner'

const Bills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const {
    data: allBills,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['allBills', currentUserEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/allBills', {
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
      <div className='upperDiv flex gap-8 lg:gap-0 justify-between items-center'>
        <h1 className='text-[32px] font-bold text-[#02101c]'>
          {' '}
          Recurring Bills
        </h1>
        <div className='relative group'>
          <button
            className='relative inline-block p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
            onClick={() => setIsModalOpen(true)}
          >
            <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

            <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
              <div className='relative z-10 flex items-center space-x-2'>
                <span className='transition-all duration-500 group-hover:translate-x-1'>
                  Add a New Bill
                </span>
                <RiBillFill className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
              </div>
            </span>
          </button>
        </div>
      </div>

      <div className='middleDiv flex flex-col lg:flex-row justify-between items-center mt-6 gap-8'>
        {isLoading ? (
          <div className='w-full flex justify-center items-center'>
            <InfinitySpin
              visible={true}
              width='200'
              color='#30e4ba'
              ariaLabel='infinity-spin-loading'
            />
          </div>
        ) : allBills && allBills.length > 0 ? (
          <>
            <div className='w-full lg:w-[50%]'>
              <TotalBills allBills={allBills} />
            </div>
            <div className='w-full lg:w-[50%]'>
              <BillSummary allBills={allBills} />
            </div>
          </>
        ) : (
          <div className='w-full col-span-2 flex justify-center items-center'>
            <p className='text-[20px] font-bold text-[#02101c]'>
              No bills found. Start by adding a new bill!
            </p>
          </div>
        )}
      </div>

      <div className='lowerDiv mt-10'>
        {isLoading ? (
          <div className='w-full flex justify-center items-center'>
            <InfinitySpin
              visible={true}
              width='200'
              color='#30e4ba'
              ariaLabel='infinity-spin-loading'
            />
          </div>
        ) : allBills && allBills.length > 0 ? (
          <BillsTable refetch={refetch} />
        ) : (
          <div className='w-full flex justify-center items-center'>
            <p className='text-[20px] font-bold text-[#02101c]'>
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <BillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default Bills