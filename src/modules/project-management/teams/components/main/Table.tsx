import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteTeamDialog from "./DeleteTeamDialog";
import UpdateTeamDialog from "./UpdateTeamDialog";
import type { Team } from "@/common/types/team";
import { useMemo } from "react";
import useTeamListQuery from "@/common/queries/teamListQuery";

export const columns: ColumnDef<Team>[] = [
	{
		id: "name",
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div>{row.getValue("name")}</div>,
	},
	{
		id: "actions",
		header: "Actions",
		size: 100,
		cell: ({ row }) => {
			return (
				<div className="flex gap-x-2">
					<DeleteTeamDialog id={row.original.id} />

					<UpdateTeamDialog team={row.original} />
					<Link
						href={{
							pathname: "/admin/project-management/teams/[teamId]",
							query: { teamId: row.original.id },
						}}
					>
						<Button variant="default" size="sm">
							<Eye />
						</Button>
					</Link>
				</div>
			);
		},
	},
];

const TeamsTable = () => {
	const { data: teamData, isLoading } = useTeamListQuery();
	const data = useMemo(() => {
		if (!teamData?.data?.docs?.length) return [];
		return teamData.data.docs;
	}, [teamData]);

	return <DataTable isLoading={isLoading} columns={columns} data={data} />;
};

export default TeamsTable;
