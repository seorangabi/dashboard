import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteProjectDialog from "./DeleteProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";
import useProjectListQuery from "@/common/queries/useProjectListQuery";
import { useMemo } from "react";
import type { Project } from "@/common/types/project";
import useMainPageQueryState from "../../hooks/useMainPageQueryState";
import type { GetProjectListQuery } from "@/common/services/project.type";
import { PROJECT_STATUS_LABEL } from "../../constants";
import { format } from "date-fns";

export const columns: ColumnDef<Project>[] = [
	{
		id: "name",
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		id: "team",
		header: "Team",
		cell: ({ row }) => (
			<div className="capitalize">{row.original?.team?.name ?? "N/A"}</div>
		),
	},
	{
		id: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">
				{PROJECT_STATUS_LABEL[row.original.status] ??
					row.original.status ??
					"N/A"}
			</div>
		),
	},
	{
		id: "date",
		header: "Date",
		cell: ({ row }) => (
			<div className="capitalize">
				{format(row.original.createdAt, "dd MMM yyy")}
			</div>
		),
	},
	{
		id: "actions",
		header: "Actions",
		size: 100,
		cell: ({ row }) => {
			return (
				<div className="flex gap-x-2">
					<DeleteProjectDialog project={row.original} />

					<UpdateProjectDialog project={row.original} />
					<Link
						href={{
							pathname: "/admin/project-management/projects/[projectId]",
							query: { projectId: row.original.id },
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

const ProjectsTable = () => {
	const { query, setQuery } = useMainPageQueryState();
	const page = Number.parseInt(query.page);
	const pageSize = Number.parseInt(query.pageSize);

	const { data: projectData, isLoading } = useProjectListQuery({
		query: {
			with: ["team"],
			skip: (page - 1) * pageSize,
			limit: pageSize,
			sort: ["created_at:desc"],
			team_id_eq: query.teamId,
			status_eq: query.status as GetProjectListQuery["status_eq"],
		},
	});
	const data = useMemo(() => {
		if (!projectData?.data?.docs?.length) return [];
		return projectData.data.docs;
	}, [projectData]);

	return (
		<div>
			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={data}
				pagination={{
					page,
					pageSize,
					hasNextPage: projectData?.data?.pagination?.hasNext ?? false,
					hasPreviousPage: projectData?.data?.pagination?.hasPrev ?? false,
					onNext: () => {
						setQuery({
							...query,
							page: (page + 1).toString(),
						});
					},
					onPrev: () => {
						setQuery({
							...query,
							page: (page - 1).toString(),
						});
					},
				}}
			/>
		</div>
	);
};

export default ProjectsTable;
