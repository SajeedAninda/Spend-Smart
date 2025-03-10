import TransactionTableSkeleton from '../../LoadingSkeletons/TransactionTableSkeleton';
import React from 'react';

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
      {transactions ? (
        <div className='w-full mt-10'>
          <div className='hidden md:grid grid-cols-12 items-center border-b border-gray-400'>
            <div className='text-[#02101c] dark:text-white text-[16px] font-bold col-span-4 py-4 flex justify-center'>
              Transaction Name
            </div>
            <div className='text-[#02101c] dark:text-white text-[16px] font-bold col-span-2 flex justify-center'>
              Category
            </div>
            <div className='text-[#02101c] dark:text-white text-[16px] font-bold col-span-3 flex justify-center'>
              Transaction Date
            </div>
            <div className='text-[#02101c] dark:text-white text-[16px] font-bold col-span-2 flex justify-center'>
              Amount
            </div>
          </div>

          {transactions?.map((transaction) => {
            const transactionDate = formatDate(transaction?.transactionDate);
            const isSpent = transaction?.transactionType === 'spent';
            const formattedAmount = isSpent
              ? `- ${formatAmount(transaction?.amount)}`
              : `+ ${formatAmount(transaction?.amount)}`;
            const amountClass = isSpent ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500';

            return (
              <div
                key={transaction._id}
                className='grid grid-cols-1 md:grid-cols-12 items-center border-b border-gray-200 py-4'
              >
                
                <div className='md:hidden px-4'>
                  <div className='text-[#02101c] dark:text-white text-[14px] font-bold'>
                    {transaction?.transactionName}
                  </div>
                  <div className='text-[#02101c] dark:text-white text-[12px] font-semibold capitalize'>
                    {transaction?.category}
                  </div>
                </div>

                <div className='hidden md:flex justify-center items-center text-[#02101c] dark:text-white text-[14px] font-bold col-span-4 py-4 pl-4'>
                  {transaction?.transactionName}
                </div>

                <div className='hidden md:flex justify-center items-center text-[#02101c] dark:text-white text-[14px] font-semibold col-span-2 capitalize'>
                  {transaction?.category}
                </div>

                <div className='md:hidden px-4 mt-2'>
                  <div className='text-[#02101c] dark:text-white text-[12px] font-semibold'>
                    Date: {transactionDate}
                  </div>
                  <div className={`text-[12px] font-bold ${amountClass}`}>
                    Amount: {formattedAmount}
                  </div>
                </div>

                <div className='hidden md:flex justify-center items-center text-[#02101c] dark:text-white text-[14px] font-semibold col-span-3'>
                  {transactionDate}
                </div>

                <div className={`hidden md:flex justify-center items-center text-[14px] font-bold col-span-2 ${amountClass}`}>
                  {formattedAmount}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <TransactionTableSkeleton />
      )}
    </>
  );
};

export default TransactionTable;