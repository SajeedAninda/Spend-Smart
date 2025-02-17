import React, { useState } from 'react'
import { PiHandWithdrawBold } from 'react-icons/pi'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { MdEditSquare } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import PiggyUpdateModal from './PiggyUpdateModal'
import AddMoneyModal from './AddMoneyModal'

const PiggyBankCard = ({ piggyBankData, refetch }) => {
  let axiosInstance = useAxiosInstance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPiggyBank, setSelectedPiggyBank] = useState(null)

  let handlePiggyBankDelete = async id => {
    Swal.fire({
      title: 'Do you want to delete this Piggy Bank?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02101c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const { data } = await axiosInstance.delete(`/piggyBankDelete/${id}`)
        if (data.deletedCount > 0) {
          refetch()
          toast.success('Deleted!', 'Your Piggy Bank has been deleted.')
        } else {
          toast.error('Error!', 'Failed to delete Piggy Bank.')
        }
      }
    })
  }

  let handlePiggyBankUpdate = bank => {
    setSelectedPiggyBank(bank)
    setIsModalOpen(true)
  }

  let handleAddMoney = bank => {
    setSelectedPiggyBank(bank)
    setIsAddModalOpen(true)
  }
  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
      {piggyBankData?.map(bank => {
        const progress = (bank.availableBalance / bank.targetSpend) * 100
        return (
          <div
            key={bank._id}
            className='space-y-4 px-8 py-7 bg-[#cbfdf2] rounded-xl shadow-md '
          >
            <div className='flex justify-between items-center pb-3'>
              <div className='flex items-center gap-2'>
                <span
                  className='w-4 h-4 rounded-full'
                  style={{ backgroundColor: bank.colorTheme }}
                ></span>
                <h3 className='text-lg font-bold [#02101c]'>
                  {bank.piggyBankName}
                </h3>
              </div>

              <div className='flex gap-4 items-center'>
                <div
                  onClick={() => {
                    handlePiggyBankUpdate(bank)
                  }}
                >
                  <MdEditSquare className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-[#02101c]' />
                </div>
                <div
                  onClick={() => {
                    handlePiggyBankDelete(bank?._id)
                  }}
                >
                  <RiDeleteBin7Fill className='text-[26px] cursor-pointer hover:opacity-50 transition duration-150 font-bold text-red-600' />
                </div>
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center'>
                <p className='text-[#02101c] text-sm '>Total Saved</p>
                <h2
                  style={{
                    color: bank.colorTheme
                  }}
                  className='text-3xl font-bold '
                >
                  ${bank.availableBalance.toFixed(2)}
                </h2>
              </div>
              <div className='relative h-2 w-full my-6 rounded-lg overflow-hidden'
              style={{
                backgroundColor: `${bank?.colorTheme}70`
              }}>
                <div
                  className='h-full rounded-lg'
                  style={{
                    width: `${progress}%`,
                    backgroundColor: bank.colorTheme
                  }}
                />
              </div>

              <div className='flex justify-between text-[14px] font-bold text-[#02101c] my-2'>
                <span>{progress.toFixed(2)}%</span>
                <span>Target of ${bank.targetSpend}</span>
              </div>
            </div>

            <div
              onClick={() => {
                handleAddMoney(bank)
              }}
              className='flex mt-10 items-center gap-4 w-full'
            >
              <div className='relative group w-full'>
                <button class='relative w-full inline-block p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba]  shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
                  <span class='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

                  <span class='relative z-10 block px-4 py-2 rounded-xl bg-[#30e4ba] '>
                    <div class='relative z-10 flex justify-center items-center space-x-2'>
                      <span class='transition-all duration-500 group-hover:translate-x-1'>
                        Add
                      </span>
                      <BiMoneyWithdraw className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                    </div>
                  </span>
                </button>
              </div>

              <div className='relative group w-full'>
                <button class='relative w-full inline-block p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba]  shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
                  <span class='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

                  <span class='relative z-10 block px-4 py-2 rounded-xl bg-[#30e4ba] '>
                    <div class='relative z-10 flex justify-center items-center space-x-2'>
                      <span class='transition-all duration-500 group-hover:translate-x-1'>
                        Withdraw
                      </span>
                      <PiHandWithdrawBold className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {isModalOpen && (
        <PiggyUpdateModal
          piggyBank={selectedPiggyBank}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}

      {isAddModalOpen && (
        <AddMoneyModal
          piggyBank={selectedPiggyBank}
          onClose={() => setIsAddModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default PiggyBankCard
