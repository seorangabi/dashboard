import React, { FC } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { cn } from "@/common/lib/utils";

const chartData = [
  { month: "Dio", desktop: 186, mobile: 80 },
  { month: "Monezilus", desktop: 305, mobile: 200 },
  { month: "Vinn", desktop: 237, mobile: 120 },
  { month: "Pandji", desktop: 73, mobile: 190 },
  { month: "Dekkun", desktop: 209, mobile: 130 },
  { month: "Kluqis", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const ImagePerWeekChart: FC<{ className?: string; label: string }> = ({
  className,
  label,
}) => {
  return (
    <div className={cn("p-4", className)}>
      <div className="mb-5 text-center">{label}</div>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ImagePerWeekChart;
