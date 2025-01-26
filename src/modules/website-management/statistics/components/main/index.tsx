import MonthPickerInput from "@/common/components/MonthPickerInput";
import React, { useState } from "react";
import VisitorAndPunchMyHeadChart from "./VisitorAndPunchMyHeadChart";
import { Skeleton } from "@/common/components/ui/skeleton";
import useVisitorAndPunchMyHeadQuery from "@/common/queries/vistiorAndPunchMyHeadQuery";

const Statistics = () => {
	const [date, setDate] = useState<Date>(new Date());

	const { data: imageProductionPerWeekData, isLoading } =
		useVisitorAndPunchMyHeadQuery({
			query: {
				monthIndex: date.getMonth(),
				year: date.getFullYear(),
			},
			options: {
				enabled: !!date,
			},
		});

	return (
		<div>
			<div className="border rounded-md">
				<div className="border-b grid grid-cols-1 items-center">
					<div className="flex-1 py-10 px-6 flex">
						<div className="text-2xl font-semibold">
							Visitor & Punch My Head
						</div>
						<div className="ml-5 w-[200px]">
							<MonthPickerInput currentMonth={date} onMonthChange={setDate} />
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1">
					{imageProductionPerWeekData && (
						<VisitorAndPunchMyHeadChart
							data={imageProductionPerWeekData.data.docs}
						/>
					)}

					{isLoading && <Skeleton className="h-[400px]" />}
				</div>
			</div>
		</div>
	);
};

export default Statistics;
