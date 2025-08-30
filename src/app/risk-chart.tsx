"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'January', risk: 186 },
  { month: 'February', risk: 305 },
  { month: 'March', risk: 237 },
  { month: 'April', risk: 273 },
  { month: 'May', risk: 209 },
  { month: 'June', risk: 214 },
];

const chartConfig = {
  risk: {
    label: 'Risk Events',
    color: 'hsl(var(--primary))',
  },
};

export function RiskChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="risk" fill="var(--color-risk)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
