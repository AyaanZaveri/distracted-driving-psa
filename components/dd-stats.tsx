"use client";

import { AlertTriangle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";

// Each bar has its own color defined here
const chartData = [
  {
    category: "Know texting is dangerous",
    value: 87,
    fill: "var(--chart-1)",
  },
  {
    category: "Admit texting while driving",
    value: 45,
    fill: "var(--chart-1)",
  },
  {
    category: "Use phone while driving",
    value: 47,
    fill: "var(--chart-1)",
  },
  {
    category: "Use phone at red light",
    value: 33,
    fill: "var(--chart-1)",
  },
  {
    category: "Accidents from distraction",
    value: 21,
    fill: "var(--chart-1)",
  },
  {
    category: "Risk multiplier",
    value: 23,
    fill: "var(--chart-4)",
  },
];

const chartConfig = {
  value: {
    label: "Percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DDStats() {
  return (
    <Card className="w-5/6">
      <CardHeader>
        <CardTitle>Distracted Driving in Canada 🇨🇦</CardTitle>
        <CardDescription>
          What Canadians say vs what they actually do — and the risks involved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value} (%)`}
                />
              }
            />
            <Bar dataKey="value" radius={8}>
              <LabelList
                dataKey="value"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mt-8">
        <div className="flex gap-2 font-medium leading-none">
          The risk of collision increases significantly when texting and driving
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="text-muted-foreground">
          <span>Data from </span>
          <Link
            href={"https://madeinca.ca/texting-and-driving-canada-statistics/"}
            target="_blank"
            className="text-white"
          >
            <span className="underline underline-offset-4 decoration-dotted decoration-foreground">
              madeinca.ca
            </span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
