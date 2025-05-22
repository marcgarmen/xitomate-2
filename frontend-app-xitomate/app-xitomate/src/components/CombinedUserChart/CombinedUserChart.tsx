"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Connect to DB
const chartData = [
  { month: "January", freemium: 186, pro: 80 },
  { month: "February", freemium: 305, pro: 200 },
  { month: "March", freemium: 237, pro: 120 },
  { month: "April", freemium: 73, pro: 190 },
  { month: "May", freemium: 209, pro: 130 },
  { month: "June", freemium: 214, pro: 140 },
]

const chartConfig = {
    freemium: {
        label: "Usuarios Freemium",
        color: "#A1C374",
    },
    pro: {
      label: "Usuarios PRO",
      color: "#F45E62",
    },
  } satisfies ChartConfig;  

export function CombinedUserChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Retención de usuarios </CardTitle>
        {/*
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
        */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="pro"
              type="natural"
              fill="var(--color-pro)"
              fillOpacity={0.4}
              stroke="var(--color-pro)"
              stackId="a"
            />
            <Area
              dataKey="freemium"
              type="natural"
              fill="var(--color-freemium)"
              fillOpacity={0.4}
              stroke="var(--color-freemium)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-4 text-sm">
            <div
            className="flex items-center justify-center w-1/3 rounded-md bg-[#F45E62] text-white p-4">
                <div className="text-lg font-bold">Usuarios PRO</div>
                <div className="text-2xl font-extrabold">140</div> {/* Here update it as the latest DB data */}
                </div>
                <div className="flex items-center justify-center w-1/3 rounded-md bg-[#A1C374] text-white p-4">
                <div className="text-lg font-bold">Usuarios Freemium</div>
                <div className="text-2xl font-extrabold">214</div> {/* Here update it as the latest DB data */}
                </div>
                <div
                className="flex items-center justify-center w-1/3 rounded-md bg-[#E1E1E1] text-black p-4">
                    <div className="text-lg font-bold">Usuarios totales</div>
                    <div className="text-2xl font-extrabold">354</div> {/* Here update it so that the sum is done automatically or from DB data */}
                    </div>
                    </div>
                    {/* Current date */}
                    <div className="flex items-center justify-center w-full text-muted-foreground mt-4">
                        {format(new Date(), "MMMM dd, yyyy")} {/* Dynamically displays today's date */}
                        </div>
                        </CardFooter>
                        </Card>
  )
}