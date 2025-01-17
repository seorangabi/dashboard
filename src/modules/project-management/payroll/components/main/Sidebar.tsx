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

const PayrollSidebar = () => {
	const [key, setKey] = useState(+new Date());
	const { query, setQuery } = useMainPageQueryState();

	return (
		<div>
			<div className="border rounded-md py-3 px-2">
				<div className="border-b pb-2 text-muted-foreground mb-5">Filter</div>

				<div className="space-y-3">
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
