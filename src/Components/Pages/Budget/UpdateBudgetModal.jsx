import React, { useState } from 'react'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import useAxiosInstance from '../../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'

const UpdateBudgetModal = ({ budget, onClose, refetch }) => {
  const [maxSpendAmount, setMaxSpendAmount] = useState(budget?.maxSpendAmount)
  const [colorTheme, setColorTheme] = useState(budget?.colorTheme)
  const axiosInstance = useAxiosInstance()

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

  const handleSubmit = async e => {
    e.preventDefault()
    if (!maxSpendAmount || !colorTheme) {
      return toast.error('Please fill all fields!')
    }
    let loadingToast = toast.loading('Updating Budget...')

    try {
      const { data } = await axiosInstance.patch(
        `/budgetUpdate/${budget?._id}`,
        {
          maxSpendAmount,
          colorTheme
        }
      )

      if (data.modifiedCount > 0) {
        toast.success('Budget updated successfully!')
        refetch()
        onClose()
      } else {
        toast.error('No changes made or update failed.')
      }
    } catch (error) {
      toast.error('Error updating budget!')
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
        className='bg-white w-[95%] lg:w-[40%] p-6 rounded-lg shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-3 right-3 text-gray-600 hover:text-black'
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div>
          <h1 className='text-[20px] text-[#02101c] font-bold flex items-center gap-2'>
            Update Budget -
            <span
              className='capitalize font-black'
              style={{ color: colorTheme }}
            >
              {budget?.category} Category
            </span>
          </h1>

          <h3 className='text-[14px] mt-2 text-[#5b5d5f] font-semibold'>
            Adjust your spending budget for this category to better track and
            manage your expenses
          </h3>
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* MAXIMUM SPEND */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='max_spend'>
                Maximum Spend
              </label>
              <input
                className='w-full py-3 px-4 rounded-lg border mt-2 placeholder:text-[14px] placeholder:text-gray-500 border-[#02101c]'
                placeholder='e.g: $180'
                type='number'
                name='max_spend'
                id='max_spend'
                required
                value={maxSpendAmount}
                onChange={e => setMaxSpendAmount(e.target.value)}
              />
            </div>

            {/* COLORS */}
            <div className='mt-3'>
              <label className='text-[14px]' htmlFor='colors'>
                Choose a Color Theme
              </label>
              <div className='colors mt-2'>
                <Select value={colorTheme} onValueChange={setColorTheme}>
                  <SelectTrigger className='w-full h-[40px] border text-center flex justify-center gap-2 border-[#02101c]'>
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
              className='relative mt-4 w-full flex justify-center p-3 font-semibold text-white bg-[#02101c] shadow-lg cursor-pointer rounded-xl transition-transform duration-300 hover:scale-105 active:scale-95'
            >
              <span className='relative z-10 flex items-center space-x-2'>
                <span className='transition-all duration-500 group-hover:translate-x-1'>
                  Submit
                </span>
                <IoCheckmarkDoneCircle className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBudgetModal
