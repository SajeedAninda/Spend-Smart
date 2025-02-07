import React from 'react'

const TransactionTable = ({ transactions }) => {
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  return (
    <>
      <div className='w-full mt-10'>
        <div className='tableHeader grid grid-cols-12 items-center border-b border-gray-400'>
          <div className='text-[#02101c] text-[16px] font-bold col-span-4 py-3'>
            Transaction Name
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-2'>
            Category
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
            Transaction Date
          </div>
          <div className='text-[#02101c] text-[16px] font-bold col-span-3 flex justify-center'>
            Amount
          </div>
        </div>

        {transactions.map(transaction => {
          const transactionDate = formatDate(transaction?.transactionDate);
          const isSpent = transaction?.transactionType === 'spent';
          const formattedAmount = isSpent 
            ? `- ${formatAmount(transaction?.amount)}` 
            : `+ ${formatAmount(transaction?.amount)}`;
          const amountClass = isSpent ? 'text-red-600' : 'text-green-600';

          return (
            <div key={transaction._id} className='tableRow grid grid-cols-12 items-center'>
              <div className='text-[#02101c] text-[14px] font-bold col-span-4 py-4 pl-4'>
                {transaction?.transactionName}
              </div>
              <div className='text-[#02101c] text-[14px] font-semibold col-span-2 capitalize'>
                {transaction?.category}
              </div>
              <div className='text-[#02101c] text-[14px] font-semibold col-span-3 flex justify-center'>
                {transactionDate}
              </div>
              <div className={`text-[#02101c]  text-[14px] font-bold col-span-3 flex justify-center ${amountClass}`}>
                {formattedAmount}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TransactionTable;
