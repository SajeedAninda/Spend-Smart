import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../../ui/chart'

const BudgetPieChart = ({ budgetData }) => {
  const totalSpend = React.useMemo(() => {
    return budgetData.reduce(
      (acc, curr) => acc + parseFloat(curr.maxSpendAmount),
      0
    )
  }, [budgetData])

  const chartData = budgetData.map(budget => ({
    category: budget.category,
    amount: parseFloat(budget.maxSpendAmount),
    fill: budget.colorTheme
  }))

  return (
    <Card className='flex flex-col'>
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
                        {totalSpend.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className='fill-muted-foreground'
                      >
                        Total Spend
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
