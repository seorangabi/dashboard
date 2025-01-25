import React from "react";
import DeleteTeamDialog from "../main/DeleteTeamDialog";
import TeamDetailBreadcrumb from "./Breadcrumb";
import UpdateTeamDialog from "../main/UpdateTeamDialog";
import { useRouter } from "next/router";
import useTeamListQuery from "@/common/queries/teamListQuery";
import { teamRoleLabel } from "@/common/constants/team";

const TeamDetail = () => {
	const router = useRouter();

	const teamId = router.query.teamId as string;

	const { data: teamListData } = useTeamListQuery({
		query: {
			id_eq: teamId,
		},
		options: {
			enabled: !!teamId,
		},
	});
	const team = teamListData?.data?.docs?.[0];

	return (
		<div>
			<TeamDetailBreadcrumb team={team} />

			<div className="flex justify-between items-center mt-6 mb-5">
				<h1 className="text-2xl font-medium">Team Detail</h1>
				<div className="space-x-2">
					<DeleteTeamDialog id={teamId} />
					<UpdateTeamDialog team={team} />
				</div>
			</div>

			<div className="border rounded-md p-4">
				<div className="gap-y-5 grid grid-cols-3">
					<div className="px-6">
						<div className="text-muted-foreground text-xs">Team Name</div>
						<h1 className="text-lg font-medium">{team?.name}</h1>
					</div>
					<div className="px-6">
						<div className="text-muted-foreground text-xs">Role</div>
						<h1 className="text-lg font-medium">
							{team?.role ? teamRoleLabel[team?.role] : "N/A"}
						</h1>
					</div>
					<div></div>

					<div className="px-6">
						<div className="text-muted-foreground text-xs">Bank Name</div>
						<h1 className="text-lg font-medium">
							{team?.bankProvider || "N/A"}
						</h1>
					</div>
					<div className="px-6">
						<div className="text-muted-foreground text-xs">
							Bank Account Name
						</div>
						<h1 className="text-lg font-medium">
							{team?.bankAccountHolder || "N/A"}
						</h1>
					</div>
					<div className="px-6">
						<div className="text-muted-foreground text-xs">
							Bank Account Number
						</div>
						<h1 className="text-lg font-medium">{team?.bankNumber || "N/A"}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamDetail;
