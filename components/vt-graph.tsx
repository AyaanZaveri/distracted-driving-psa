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
  { time: 0.0, velocity: 21.0 },
  { time: 0.1, velocity: 21.0 },
  { time: 0.2, velocity: 21.0 },
  { time: 0.3, velocity: 21.0 },
  { time: 0.4, velocity: 21.0 },
  { time: 0.5, velocity: 21.0 },
  { time: 0.6, velocity: 21.0 },
  { time: 0.7, velocity: 21.0 },
  { time: 0.8, velocity: 21.0 },
  { time: 0.9, velocity: 21.0 },
  { time: 1.0, velocity: 21.0 },
  { time: 1.1, velocity: 21.0 },
  { time: 1.2, velocity: 21.0 },
  { time: 1.3, velocity: 21.0 },
  { time: 1.4, velocity: 21.0 },
  { time: 1.5, velocity: 21.0 },
  { time: 1.6, velocity: 21.0 },
  { time: 1.7, velocity: 21.0 },
  { time: 1.8, velocity: 21.0 },
  { time: 1.9, velocity: 21.0 },
  { time: 2.0, velocity: 21.0 },
  { time: 2.1, velocity: 21.0 },
  { time: 2.2, velocity: 21.0 },
  { time: 2.3, velocity: 21.0 },
  { time: 2.4, velocity: 21.0 },
  { time: 2.5, velocity: 21.0 },
  { time: 2.6, velocity: 21.0 },
  { time: 2.7, velocity: 21.0 },
  { time: 2.8, velocity: 21.0 },
  { time: 2.9, velocity: 21.0 },
  { time: 3.0, velocity: 21.0 },
  { time: 3.1, velocity: 21.0 },
  { time: 3.2, velocity: 21.0 },
  { time: 3.3, velocity: 21.0 },
  { time: 3.4, velocity: 21.0 },
  { time: 3.5, velocity: 21.0 },
  { time: 3.6, velocity: 21.0 },
  { time: 3.7, velocity: 21.0 },
  { time: 3.8, velocity: 21.0 },
  { time: 3.9, velocity: 21.0 },
  { time: 4.0, velocity: 21.0 },
  { time: 4.1, velocity: 21.0 },
  { time: 4.2, velocity: 21.0 },
  { time: 4.3, velocity: 21.0 },
  { time: 4.4, velocity: 21.0 },
  { time: 4.5, velocity: 21.0 },
  { time: 4.6, velocity: 21.0 },
  { time: 4.7, velocity: 21.0 },
  { time: 4.8, velocity: 21.0 },
  { time: 4.9, velocity: 21.0 },
  { time: 5.0, velocity: 21.0 },
  { time: 5.1, velocity: 21.0 },
  { time: 5.2, velocity: 21.0 },
  { time: 5.3, velocity: 21.0 },
  { time: 5.4, velocity: 21.0 },
  { time: 5.5, velocity: 21.0 },
  { time: 5.6, velocity: 21.0 },
  { time: 5.7, velocity: 21.0 },
  { time: 5.8, velocity: 21.0 },
  { time: 5.9, velocity: 21.0 },
  { time: 6.0, velocity: 21.0 },
  { time: 6.1, velocity: 21.0 },
  { time: 6.2, velocity: 21.0 },
  { time: 6.3, velocity: 20.4 },
  { time: 6.4, velocity: 19.7 },
  { time: 6.5, velocity: 19.1 },
  { time: 6.6, velocity: 18.4 },
  { time: 6.7, velocity: 17.8 },
  { time: 6.8, velocity: 17.1 },
  { time: 6.9, velocity: 16.5 },
  { time: 7.0, velocity: 15.8 },
  { time: 7.1, velocity: 15.2 },
  { time: 7.2, velocity: 14.5 },
  { time: 7.3, velocity: 13.9 },
  { time: 7.4, velocity: 13.2 },
  { time: 7.5, velocity: 12.6 },
  { time: 7.6, velocity: 11.9 },
  { time: 7.7, velocity: 11.3 },
  { time: 7.8, velocity: 10.6 },
  { time: 7.9, velocity: 10.0 },
  { time: 8.0, velocity: 9.3 },
  { time: 8.1, velocity: 8.7 },
  { time: 8.2, velocity: 8.0 },
  { time: 8.3, velocity: 7.4 },
  { time: 8.4, velocity: 6.7 },
  { time: 8.5, velocity: 6.1 },
  { time: 8.6, velocity: 5.4 },
  { time: 8.7, velocity: 4.8 },
  { time: 8.8, velocity: 4.1 },
  { time: 8.9, velocity: 3.5 },
  { time: 9.0, velocity: 2.8 },
  { time: 9.1, velocity: 2.2 },
  { time: 9.2, velocity: 1.5 },
  { time: 9.3, velocity: 0.8 },
  { time: 9.4, velocity: 0.0 },
];

const chartConfig = {
  velocity: {
    label: "Velocity (m/s)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function VTGraph() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Velocity-Time Graph</CardTitle>
        <CardDescription>
          This graph shows the velocity of the vehicle over time. The red dashed
          line indicates the point at which you begin to brake (6.3s). The final
          displacement is approximately 164.1m.
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
                value: "Velocity (m/s)",
                angle: -90,
                position: "insideLeft",
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 25]}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="velocity"
              type="linear"
              fill="var(--chart-2)"
              fillOpacity={0.3}
              stroke="var(--chart-2)"
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
            Final velocity: 0 m/s (at rest)
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
