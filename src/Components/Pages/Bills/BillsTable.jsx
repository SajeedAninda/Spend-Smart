import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'

const BillsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilterValue, setSelectedFilterValue] = useState('latest')

  console.log(searchTerm,selectedFilterValue)

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
    </div>
  )
}

export default BillsTable
