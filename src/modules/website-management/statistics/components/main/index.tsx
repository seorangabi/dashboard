import MonthPickerInput from "@/common/components/MonthPickerInput";
import { useMemo, useState } from "react";
import VisitorAndPunchMyHeadChart from "./VisitorAndPunchMyHeadChart";
import { Skeleton } from "@/common/components/ui/skeleton";
import useVisitorAndPunchMyHeadQuery from "@/common/queries/useVistiorAndPunchMyHeadQuery";
import useMyApiQuery from "@/common/queries/useMyApiQuery";

export const CHART_COLORS = [
	"rgb(231, 110, 80)",
	"rgb(124, 58, 237)",
	"rgb(118, 83, 55)",
	"rgb(250, 204, 21)",
	"rgb(42, 157, 144)",
	"rgb(37, 99, 235)",
	"rgb(226, 29, 72)",
	"rgb(251, 213, 218)",
	"rgb(18, 84, 39)",
	"rgb(220, 38, 38)",
	"rgb(22, 163, 74)",
];

const Statistics = () => {
	const [date, setDate] = useState<Date>(new Date());

	const { data } = useMyApiQuery({
		options: {},
	});

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

	const countries = imageProductionPerWeekData?.data?.countries || [];

	const visitors = useMemo(() => {
		if (!imageProductionPerWeekData?.data?.docs?.length) return [];

		return imageProductionPerWeekData?.data?.docs?.map((doc) => {
			return {
				date: doc.date,
				...doc.visitor,
			};
		});
	}, [imageProductionPerWeekData?.data?.docs]);

	return (
		<div>
			<div className="border rounded-md">
				<div className="border-b grid grid-cols-1 items-center">
					<div className="flex-1 py-10 px-6 flex">
						<div className="text-2xl font-semibold">Visitor</div>
						<div className="ml-5 w-[200px]">
							<MonthPickerInput currentMonth={date} onMonthChange={setDate} />
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1">
					{imageProductionPerWeekData && (
						<>
							<VisitorAndPunchMyHeadChart
								data={visitors}
								countries={countries}
							/>
							{/* <VisitorAndPunchMyHeadChart
								data={visitors}
								countries={countries}
							/> */}
						</>
					)}

					{isLoading && <Skeleton className="h-[400px]" />}
				</div>
			</div>

			<div className="mt-4">Test Location: {data?.country_name}</div>
		</div>
	);
};

export default Statistics;
