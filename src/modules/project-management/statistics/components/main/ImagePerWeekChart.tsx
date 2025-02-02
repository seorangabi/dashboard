import type { FC } from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/common/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/common/lib/utils";
import type {
	ImageProductionPerWeek,
} from "@/common/services/statistic.type";
import { format } from "date-fns";

const chartConfig = {
	image: {
		label: "Image",
		color: "#0a0a0a",
	},
} satisfies ChartConfig;

const ImagePerWeekChart: FC<{
	className?: string;
	label: string;
	data: ImageProductionPerWeek;
}> = ({ className, data, label }) => {
	return (
		<div className={cn("p-4", className)}>
			<div className="flex justify-between mb-5 px-8">
				<div className="text-center">{label}</div>
				<div>
					{format(data.start, "d MMM yyyy")} - {format(data.end, "d MMM yyyy")}
				</div>
			</div>
			<ChartContainer config={chartConfig} className="h-[200px] w-full">
				<BarChart accessibilityLayer data={data.teams}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="name"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<YAxis />

					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="count" fill="var(--color-image)" radius={5} />
				</BarChart>
			</ChartContainer>
		</div>
	);
};

export default ImagePerWeekChart;
