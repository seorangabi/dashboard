import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteProjectDialog from "./DeleteProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";
import useProjectListQuery from "@/common/queries/projectListQuery";
import { useMemo } from "react";
import { Project } from "@/common/types/project";

export const columns: ColumnDef<Project>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
  const { data: projectData, isLoading } = useProjectListQuery();
  const data = useMemo(() => {
    if (!projectData?.data?.docs?.length) return [];
    return projectData.data.docs;
  }, [projectData]);

  return <DataTable isLoading={isLoading} columns={columns} data={data} />;
};

export default ProjectsTable;
