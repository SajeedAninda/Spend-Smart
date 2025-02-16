import React from 'react'

const PiggyBankCard = ({ piggyBankData }) => {
  console.log(piggyBankData)
  return (
    <div className='grid grid-cols-3 gap-6'>
      {piggyBankData?.map(bank => {
        const progress = (bank.availableBalance / bank.targetSpend) * 100
        return (
          <div
            key={bank._id}
            className='space-y-4 px-8 py-7 bg-[#cbfdf2] rounded-xl shadow-md '
          >
            <div className='flex items-center gap-2'>
              <span
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: bank.colorTheme }}
              ></span>
              <h3 className='text-lg font-semibold [#02101c]'>
                {bank.piggyBankName}
              </h3>
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <p className='text-[#02101c] text-sm '>Total Saved</p>
                <h2 className='text-3xl font-bold text-[#02101c]'>
                  ${bank.availableBalance.toFixed(2)}
                </h2>
              </div>
              <div className='relative h-2 w-full my-6 bg-white rounded-lg overflow-hidden'>
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
            <div className='flex gap-2'>
              <button className='px-4 py-2 rounded-lg bg-gray-100 text-[#02101c] text-sm font-medium'>
                + Add Money
              </button>
              <button className='px-4 py-2 border rounded-lg text-sm font-medium'>
                Withdraw
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PiggyBankCard
