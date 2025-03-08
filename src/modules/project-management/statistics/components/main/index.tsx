import { useMemo, useState } from "react";
import ImagePerWeekChart from "./ImagePerWeekChart";
import MonthPickerInput from "@/common/components/MonthPickerInput";
import useImageProductionPerWeekQuery from "@/common/queries/useImageProductionPerWeekQuery";
import { Skeleton } from "@/common/components/ui/skeleton";
import { cn } from "@/common/lib/utils";

const Statistics = () => {
	const [date, setDate] = useState<Date>(new Date());

	const { data: imageProductionPerWeekData, isLoading } =
		useImageProductionPerWeekQuery({
			query: {
				monthIndex: date.getMonth(),
				year: date.getFullYear(),
			},
			options: {
				enabled: !!date,
			},
		});

	const overallImage = useMemo(() => {
		if (!imageProductionPerWeekData?.data?.docs?.length) return 0;

		return imageProductionPerWeekData?.data.docs.reduce(
			(accumulator, current) =>
				current.teams.reduce((acc, team) => acc + team.count, 0) + accumulator,
			0,
		);
	}, [imageProductionPerWeekData?.data.docs]);

	return (
		<div>
			<div className="border rounded-md">
				<div className="border-b grid grid-cols-1 md:grid-cols-[1fr_300px] items-center">
					<div className="flex-1 md:border-r py-10 px-6 flex flex-col md:flex-row">
						<div className="text-xl md:text-2xl font-semibold">
							Image Production Per Week
						</div>
						<div className="md:ml-5 w-[200px]">
							<MonthPickerInput currentMonth={date} onMonthChange={setDate} />
						</div>
					</div>
					<div className="flex items-center justify-center flex-col">
						<div className="text-2xl font-semibold">{overallImage}</div>
						<div className="text-muted-foreground">Overall Image</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2">
					{!!imageProductionPerWeekData?.data?.docs?.length &&
						!isLoading &&
						imageProductionPerWeekData?.data.docs.map((week, index) => {
							const currentIsEven = index % 2 === 0;

							const totalIsEven =
								imageProductionPerWeekData.data.docs.length % 2 === 0;
							const showBorderBottom = !(totalIsEven
								? index === imageProductionPerWeekData.data.docs.length - 1 ||
									index === imageProductionPerWeekData.data.docs.length - 2
								: index === imageProductionPerWeekData.data.docs.length - 1);

							return (
								<ImagePerWeekChart
									key={week.start}
									label={`week ${index + 1}`}
									data={week}
									className={cn("border-b", {
										"border-r": currentIsEven,
										"border-b": showBorderBottom,
									})}
								/>
							);
						})}

					{isLoading && (
						<>
							<Skeleton className="h-[250px] m-2" />
							<Skeleton className="h-[250px] m-2" />
							<Skeleton className="h-[250px] m-2" />
							<Skeleton className="h-[250px] m-2" />
							<Skeleton className="h-[250px] m-2" />
							<Skeleton className="h-[250px] m-2" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Statistics;
