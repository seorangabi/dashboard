import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/common/components/ui/chart";
import { cn } from "@/common/lib/utils";
import type { ImageProductionPerWeek } from "@/common/services/statistic.type";
import type { FC } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	visitor: {
		label: "Visitor",
		color: "hsl(var(--chart-4))",
	},
	punchMyHead: {
		label: "Punch",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const VisitorAndPunchMyHeadChart: FC<{
	data: ImageProductionPerWeek[];
	className?: string;
}> = ({ data, className }) => {
	return (
		<div className={cn("p-4", className)}>
			<ChartContainer config={chartConfig} className="h-[400px] w-full">
				<AreaChart
					accessibilityLayer
					data={data}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 2)}
						// angle={-45}
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />

					<defs>
						<linearGradient id="punchMyHead" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-punchMyHead)"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-punchMyHead)"
								stopOpacity={0.1}
							/>
						</linearGradient>
						<linearGradient id="visitor" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-visitor)"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-visitor)"
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>
					<Area
						dataKey="visitor"
						type="linear"
						fill="url(#visitor)"
						fillOpacity={0.4}
						stroke="var(--color-visitor)"
						stackId="a"
					/>
					<Area
						dataKey="punchMyHead"
						type="linear"
						fill="url(#punchMyHead)"
						fillOpacity={0.4}
						stroke="var(--color-punchMyHead)"
						stackId="a"
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
};

export default VisitorAndPunchMyHeadChart;
