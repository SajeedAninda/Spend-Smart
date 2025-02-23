import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

const BudgetChartSkeleton = () => {
  return (
    <Card className='flex flex-col bg-transparent border-none shadow-none animate-pulse'>
      <CardContent className='flex-1 pb-0 flex justify-center items-center'>
        <div className='w-[250px] h-[250px] rounded-full bg-gray-300'></div>
      </CardContent>
    </Card>
  )
}

export default BudgetChartSkeleton
