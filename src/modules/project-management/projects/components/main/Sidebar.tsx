import SelectTeam from "@/common/components/SelectTeam";
import { Label } from "@/common/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select";
import useMainPageQueryState from "../../hooks/useMainPageQueryState";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import { useState } from "react";
import { PROJECT_STATUS_LABEL } from "../../constants";

const ProjectSidebar = () => {
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
								<SelectItem value="OFFERING">
									{PROJECT_STATUS_LABEL.OFFERING}
								</SelectItem>
								<SelectItem value="IN_PROGRESS">
									{PROJECT_STATUS_LABEL.IN_PROGRESS}
								</SelectItem>
								<SelectItem value="DONE">
									{PROJECT_STATUS_LABEL.DONE}
								</SelectItem>
								<SelectItem value="CANCELLED">
									{PROJECT_STATUS_LABEL.CANCELLED}
								</SelectItem>

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

export default ProjectSidebar;
