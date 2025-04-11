"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: 0.0, position: 0.0 },
  { time: 0.1, position: 2.1 },
  { time: 0.2, position: 4.2 },
  { time: 0.3, position: 6.3 },
  { time: 0.4, position: 8.4 },
  { time: 0.5, position: 10.5 },
  { time: 0.6, position: 12.6 },
  { time: 0.7, position: 14.7 },
  { time: 0.8, position: 16.8 },
  { time: 0.9, position: 18.9 },
  { time: 1.0, position: 21.0 },
  { time: 1.1, position: 23.1 },
  { time: 1.2, position: 25.2 },
  { time: 1.3, position: 27.3 },
  { time: 1.4, position: 29.4 },
  { time: 1.5, position: 31.5 },
  { time: 1.6, position: 33.6 },
  { time: 1.7, position: 35.7 },
  { time: 1.8, position: 37.8 },
  { time: 1.9, position: 39.9 },
  { time: 2.0, position: 42.0 },
  { time: 2.1, position: 44.1 },
  { time: 2.2, position: 46.2 },
  { time: 2.3, position: 48.3 },
  { time: 2.4, position: 50.4 },
  { time: 2.5, position: 52.5 },
  { time: 2.6, position: 54.6 },
  { time: 2.7, position: 56.7 },
  { time: 2.8, position: 58.8 },
  { time: 2.9, position: 60.9 },
  { time: 3.0, position: 63.0 },
  { time: 3.1, position: 65.1 },
  { time: 3.2, position: 67.2 },
  { time: 3.3, position: 69.3 },
  { time: 3.4, position: 71.4 },
  { time: 3.5, position: 73.5 },
  { time: 3.6, position: 75.6 },
  { time: 3.7, position: 77.7 },
  { time: 3.8, position: 79.8 },
  { time: 3.9, position: 81.9 },
  { time: 4.0, position: 84.0 },
  { time: 4.1, position: 86.1 },
  { time: 4.2, position: 88.2 },
  { time: 4.3, position: 90.3 },
  { time: 4.4, position: 92.4 },
  { time: 4.5, position: 94.5 },
  { time: 4.6, position: 96.6 },
  { time: 4.7, position: 98.7 },
  { time: 4.8, position: 100.8 },
  { time: 4.9, position: 102.9 },
  { time: 5.0, position: 105.0 },
  { time: 5.1, position: 107.1 },
  { time: 5.2, position: 109.2 },
  { time: 5.3, position: 111.3 },
  { time: 5.4, position: 113.4 },
  { time: 5.5, position: 115.5 },
  { time: 5.6, position: 117.6 },
  { time: 5.7, position: 119.7 },
  { time: 5.8, position: 121.8 },
  { time: 5.9, position: 123.9 },
  { time: 6.0, position: 126.0 },
  { time: 6.1, position: 128.1 },
  { time: 6.2, position: 130.2 },
  { time: 6.3, position: 132.3 },
  { time: 6.4, position: 134.3 },
  { time: 6.5, position: 136.2 },
  { time: 6.6, position: 138.1 },
  { time: 6.7, position: 139.9 },
  { time: 6.8, position: 141.6 },
  { time: 6.9, position: 143.3 },
  { time: 7.0, position: 144.9 },
  { time: 7.1, position: 146.5 },
  { time: 7.2, position: 148.0 },
  { time: 7.3, position: 149.4 },
  { time: 7.4, position: 150.7 },
  { time: 7.5, position: 152.0 },
  { time: 7.6, position: 153.2 },
  { time: 7.7, position: 154.4 },
  { time: 7.8, position: 155.5 },
  { time: 7.9, position: 156.5 },
  { time: 8.0, position: 157.5 },
  { time: 8.1, position: 158.4 },
  { time: 8.2, position: 159.2 },
  { time: 8.3, position: 160.0 },
  { time: 8.4, position: 160.7 },
  { time: 8.5, position: 161.3 },
  { time: 8.6, position: 161.9 },
  { time: 8.7, position: 162.4 },
  { time: 8.8, position: 162.8 },
  { time: 8.9, position: 163.2 },
  { time: 9.0, position: 163.5 },
  { time: 9.1, position: 163.8 },
  { time: 9.2, position: 164.0 },
  { time: 9.3, position: 164.1 },
  { time: 9.4, position: 164.1 },
];

const chartConfig = {
  position: {
    label: "Displacement (m)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DTGraph() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Position-Time Graph</CardTitle>
        <CardDescription>
          This shows the displacement of the car over time. The slope of the
          graph represents the velocity, which is constant until the braking
          point at 6.3 seconds, where the slope decreases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              label={{
                value: "Time (s)",
                position: "insideBottom",
                offset: -10,
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{
                value: "Displacement (m)",
                angle: -90,
                position: "insideLeft",
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 180]}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent indicator="dot" />}
              labelFormatter={(value) => `${value}`}
            />
            <Area
              dataKey="position"
              type="linear"
              fill="var(--chart-1)"
              fillOpacity={0.3}
              stroke="var(--chart-1)"
            />
            <ReferenceLine x={6.0} stroke="orange" strokeDasharray="4 4" />
            <ReferenceLine x={6.2} stroke="red" strokeDasharray="4 4" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full items-start text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="size-2 bg-[orange] rounded-full" />
            <span>Reaction time</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="size-2 bg-[red] rounded-full" />
            <span>Braking point</span>
          </div>
          <div className="flex items-center gap-2 font-medium leading-none mt-4">
            Final displacement: 164.1 m
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
