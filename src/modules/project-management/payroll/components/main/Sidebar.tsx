import SelectTeam from "@/common/components/SelectTeam";
import { Label } from "@/common/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import { useState } from "react";
import useMainPageQueryState from "../../hooks/useMainPageQueryState";
import { PAYROLL_STATUS_LABEL } from "../../constants";
import type { Payroll } from "@/common/types/payroll";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover";
import { Calendar } from "@/common/components/ui/calendar";
import { addDays, format } from "date-fns";

const PayrollSidebar = () => {
	const [key, setKey] = useState(+new Date());
	const { query, setQuery } = useMainPageQueryState();

	return (
		<div>
			<div className="border rounded-md py-3 px-2">
				<div className="border-b pb-2 text-muted-foreground mb-5">Filter</div>

				<div className="space-y-3">
					<div className="grid w-full items-center gap-1.5">
						<Label>Period</Label>
						<div className="grid grid-cols-2 gap-x-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-full justify-start text-left font-normal",
											!query.periodStart && "text-muted-foreground",
										)}
									>
										{query.periodStart ? (
											format(query.periodStart, "d MMM yyyy")
										) : (
											<span>Start</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={new Date(query.periodStart)}
										onSelect={(newDate) => {
											setQuery({
												...query,
												periodStart: newDate
													? format(newDate, "yyyy-MM-dd")
													: undefined,
											});
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-full justify-start text-left font-normal",
											!query.periodEnd && "text-muted-foreground",
										)}
									>
										{query.periodEnd ? (
											format(query.periodEnd, "d MMM yyyy")
										) : (
											<span>End</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={new Date(query.periodEnd)}
										onSelect={(newDate) => {
											setQuery({
												...query,
												periodEnd: newDate
													? format(newDate, "yyyy-MM-dd")
													: undefined,
											});
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-x-2">
						<Button
							variant="outline"
							className="w-full"
							onClick={() => {
								setQuery({
									...query,
									periodStart: format(
										addDays(query.periodStart, -7),
										"yyyy-MM-dd",
									),
									periodEnd: format(addDays(query.periodEnd, -7), "yyyy-MM-dd"),
								});
							}}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => {
								setQuery({
									...query,
									periodStart: format(
										addDays(query.periodStart, 7),
										"yyyy-MM-dd",
									),
									periodEnd: format(addDays(query.periodEnd, 7), "yyyy-MM-dd"),
								});
							}}
						>
							Next
						</Button>
					</div>

					<hr />

					<div className="grid w-full items-center gap-1.5">
						<Label>Team</Label>
						<SelectTeam
							value={query.teamId}
							onChange={(value) => {
								setQuery({
									...query,
									teamId: value,
								});
							}}
							popoverContentClassName={cn("w-[280px]")}
						/>
					</div>
					<div className="grid w-full items-center gap-1.5">
						<Label>Status</Label>
						<Select
							key={key}
							value={query.status}
							onValueChange={(value) => {
								setQuery({
									...query,
									status: value,
								});
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(PAYROLL_STATUS_LABEL).map((status) => (
									<SelectItem key={status} value={status}>
										{PAYROLL_STATUS_LABEL[status as Payroll["status"]]}
									</SelectItem>
								))}
								<Button
									className="w-full px-2"
									variant="secondary"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										setQuery({
											...query,
											status: undefined,
										});
										setKey(+new Date());
									}}
								>
									Clear
								</Button>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PayrollSidebar;
