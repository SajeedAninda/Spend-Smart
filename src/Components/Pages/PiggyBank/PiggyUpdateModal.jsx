import React, { useState } from 'react'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'

const PiggyUpdateModal = ({ piggyBank, onClose, refetch }) => {
  const [piggyBankName, setPiggyBankName] = useState(piggyBank?.piggyBankName)
  const [targetSpend, setTargetSpend] = useState(piggyBank?.targetSpend)
  const [colors, setColors] = useState(piggyBank?.colorTheme)

  let axiosInstance = useAxiosInstance()

  const colorOptions = [
    { name: 'Dark Yellow', code: '#B8860B' },
    { name: 'Royal Blue', code: '#4169E1' },
    { name: 'Crimson Red', code: '#DC143C' },
    { name: 'Emerald Green', code: '#50C878' },
    { name: 'Sunset Orange', code: '#FF4500' },
    { name: 'Deep Purple', code: '#800080' },
    { name: 'Midnight Blue', code: '#191970' },
    { name: 'Charcoal Gray', code: '#36454F' },
    { name: 'Dark Magenta', code: '#8B008B' },
    { name: 'Dark Turquoise', code: '#008B8B' }
  ]

  const handleUpdatePiggyBank = async e => {
    e.preventDefault()
    if (!piggyBankName || !targetSpend || !colors) {
      return toast.error('Please fill all fields!')
    }
    let loadingToast = toast.loading('Updating Piggy Bank...')

    try {
      const { data } = await axiosInstance.patch(
        `/piggyBankUpdate/${piggyBank?._id}`,
        { piggyBankName, targetSpend, colorTheme: colors }
      )

      if (data.modifiedCount > 0) {
        toast.success('Piggy Bank updated successfully!')
        refetch()
        onClose()
      } else {
        toast.error('No changes made or update failed.')
      }
    } catch (error) {
      toast.error('Error updating Piggy Bank!')
    }
    toast.dismiss(loadingToast)
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
          className='absolute top-3 right-3 text-gray-600 dark:text-white  hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div>
          <h1 className='text-[20px] text-[#02101c] dark:text-white font-bold'>
            Update Piggy Bank
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] dark:text-white font-semibold'>
            Update the piggy bank that you created and make changes that you
            might require
          </h3>
          <form className='mt-4' onSubmit={handleUpdatePiggyBank}>
            {/* PIGGY BANK NAME  */}
            <div>
              <label className='text-[14px] dark:text-white' htmlFor='transactionName'>
                Piggy Bank Name
              </label>
              <input
                value={piggyBankName}
                placeholder='e.g: Trip to Europe'
                maxLength={30}
                onChange={e => {
                  setPiggyBankName(e.target.value)
                }}
                className='w-full dark:bg-slate-900 dark:placeholder:text-white py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] dark:text-white placeholder:text-gray-500 border-[#02101c]'
                type='text'
                name='transactionName'
                id='transactionName'
                required
              />
              <p className='mt-2 text-[14px] dark:text-white text-right'>
                {30 - piggyBankName?.length} characters left
              </p>
            </div>

            {/* Target Amount  */}
            <div className=''>
              <label className='text-[14px] dark:text-white' htmlFor='max_spend'>
                Target Amount
              </label>
              <input
                className='w-full dark:bg-slate-900 dark:placeholder:text-white py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] dark:text-white placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $2000'
                type='number'
                name='max_spend'
                id='max_spend'
                required
                value={targetSpend}
                onChange={e => setTargetSpend(e.target.value)}
              />
            </div>

            {/* COLORS  */}
            <div className='mt-3'>
              <label className='text-[14px] dark:text-white' htmlFor='colors'>
                Choose a Color Theme
              </label>
              <div className='colors mt-2'>
                <Select value={colors} onValueChange={setColors}>
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c] dark:border-white dark:text-white'>
                    <SelectValue placeholder='Select a color' />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.code} value={color.code}>
                        <div className='flex items-center gap-2'>
                          <span
                            className='w-5 h-5 rounded-full border'
                            style={{ backgroundColor: color.code }}
                          ></span>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              type='submit'
              className='relative mt-4 w-full flex justify-center p-px font-semibold leading-6 text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 dark:border-2 dark:border-white'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

              <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#02101c] '>
                <div className='relative z-10 flex items-center space-x-2'>
                  <span className='transition-all duration-500 group-hover:translate-x-1'>
                    Submit
                  </span>
                  <IoCheckmarkDoneCircle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                </div>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PiggyUpdateModal
