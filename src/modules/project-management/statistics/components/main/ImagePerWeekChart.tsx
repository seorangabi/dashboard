import React, { FC } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/common/lib/utils";

const chartData = [
  { team: "Dio", image: 186 },
  { team: "Monezilus", image: 305 },
  { team: "Vinn", image: 237 },
  { team: "Pandji", image: 73 },
  { team: "Dekkun", image: 209 },
  { team: "Kluqis", image: 214 },
];

const chartConfig = {
  image: {
    label: "Image",
    color: "#0a0a0a",
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
            dataKey="team"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="image" fill="var(--color-image)" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ImagePerWeekChart;
