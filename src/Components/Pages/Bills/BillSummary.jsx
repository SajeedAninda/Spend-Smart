import BillSummarySkeleton from '../../LoadingSkeletons/BillSummarySkeleton';
import React from 'react';

const BillSummary = ({ allBills }) => {
  const today = new Date().getDate(); 


  const paidBills = allBills?.filter(bill => bill.billStatus === 'paid');
  const paidTotal = paidBills?.reduce((sum, bill) => sum + parseFloat(bill.billingAmount), 0);

  const dueBills = allBills?.filter(bill => bill.billStatus === 'unpaid' && parseInt(bill.billDueDay) < today);
  const dueTotal = dueBills?.reduce((sum, bill) => sum + parseFloat(bill.billingAmount), 0);

  const upcomingBills = allBills?.filter(bill => bill.billStatus === 'unpaid' && parseInt(bill.billDueDay) >= today);
  const upcomingTotal = upcomingBills?.reduce((sum, bill) => sum + parseFloat(bill.billingAmount), 0);
  
  if(!allBills){
    return <BillSummarySkeleton />
  }

  return (
    <div className='bg-[#cbfdf2] dark:bg-[#125042] h-[200px] rounded-lg py-6 px-10'>
      <p className='text-[18px] font-bold text-[#02101c] dark:text-white'>Bills Summary</p>
      <div>
        <div className='flex justify-between mt-5 text-green-700 dark:text-green-500'>
          <p className='text-[16px] font-bold'>Paid Bills</p>
          <p className='text-[16px] font-bold'>{paidBills?.length} (Total: $ {paidTotal?.toFixed(2)})</p>
        </div>

        <div className='flex justify-between mt-5 text-red-700 dark:text-red-500'>
          <p className='text-[16px] font-bold'>Due Bills</p>
          <p className='text-[16px] font-bold'>{dueBills?.length} (Total: $ {dueTotal?.toFixed(2)})</p>
        </div>

        <div className='flex justify-between mt-5 text-yellow-700 dark:text-yellow-500'>
          <p className='text-[16px] font-bold'>Upcoming Bills</p>
          <p className='text-[16px] font-bold'>{upcomingBills?.length} (Total: $ {upcomingTotal?.toFixed(2)})</p>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
