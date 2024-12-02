import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteProjectDialog from "./DeleteProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";
import useProjectListQuery from "@/common/queries/projectListQuery";
import { useMemo, useState } from "react";
import { Project } from "@/common/types/project";

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
      <div className="capitalize">{row.original.status ?? "N/A"}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    size: 100,
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-2">
          <DeleteProjectDialog id={row.original.id} />

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
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 50,
  });
  const { data: projectData, isLoading } = useProjectListQuery({
    query: {
      with: ["team"],
      skip: (pagination.page - 1) * pagination.pageSize,
      limit: pagination.pageSize,
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
          page: pagination.page,
          pageSize: pagination.pageSize,
          hasNextPage: projectData?.data?.pagination?.hasNext ?? false,
          hasPreviousPage: projectData?.data?.pagination?.hasPrev ?? false,
          onNext: () => {
            setPagination((prev) => ({
              ...prev,
              page: prev.page + 1,
            }));
          },
          onPrev: () => {
            setPagination((prev) => ({
              ...prev,
              page: prev.page - 1,
            }));
          },
        }}
      />
    </div>
  );
};

export default ProjectsTable;
