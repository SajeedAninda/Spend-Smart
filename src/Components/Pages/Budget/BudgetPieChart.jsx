import React from 'react'
import { Pie, PieChart, Label } from 'recharts'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart'

const BudgetPieChart = ({ transactionData, budgetData }) => {
  console.log(transactionData)

  let totalBudget = 0
  if (budgetData) {
    totalBudget = budgetData.reduce((acc, curr) => acc + parseFloat(curr.maxSpendAmount), 0)
  }

  const budgetCategories = new Set(budgetData?.map(budget => budget.category))

  let totalSpent = 0
  if (transactionData) {
    totalSpent = transactionData
      .filter(transaction => budgetCategories.has(transaction.category))
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
  }

  const chartData = budgetData?.map(budget => ({
    category: budget.category,
    amount: parseFloat(budget.maxSpendAmount),
    fill: budget.colorTheme
  }))

  return (
    <Card className='flex flex-col bg-transparent border-none shadow-none'>
      <CardHeader className='items-center pb-0'></CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={{}}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='amount'
              nameKey='category'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                    return null
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                       ${totalSpent}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className='fill-muted-foreground text-gray-500'
                      >
                       of ${totalBudget} limit
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BudgetPieChart
