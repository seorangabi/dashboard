import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/common/components/ui/chart";
import { cn } from "@/common/lib/utils";
import type { FC } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { CHART_COLORS } from ".";

const chartConfig = {} satisfies ChartConfig;

const VisitorAndPunchMyHeadChart: FC<{
	data: Record<string, unknown>[];
	countries: string[];
	className?: string;
}> = ({ data, countries, className }) => {
	return (
		<div className={cn("p-4", className)}>
			<ChartContainer config={chartConfig} className="h-[400px] w-full">
				<BarChart accessibilityLayer data={data}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 2)}
					/>
					<ChartTooltip
						content={<ChartTooltipContent hideLabel className="w-[180px]" />}
						cursor={false}
						defaultIndex={1}
					/>

					{countries.map((country, index) => (
						<Bar
							key={country}
							dataKey={country}
							stackId="a"
							fill={CHART_COLORS[index] || "#000"}
						/>
					))}
				</BarChart>
			</ChartContainer>
		</div>
	);
};

export default VisitorAndPunchMyHeadChart;
