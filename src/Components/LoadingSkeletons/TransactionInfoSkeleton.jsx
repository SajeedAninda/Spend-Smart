import React from 'react';

const TransactionInfoSkeleton = () => {
    return (
        <div className="middleDiv w-full mt-10 grid grid-cols-3 gap-6 items-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-300 to-gray-400 py-6 px-10 rounded-lg animate-pulse"
            >
              <div className="h-5 w-32 bg-gray-500 rounded mb-2"></div>
              <div className="h-10 w-24 bg-gray-500 rounded"></div>
            </div>
          ))}
        </div>
      );
};

export default TransactionInfoSkeleton;