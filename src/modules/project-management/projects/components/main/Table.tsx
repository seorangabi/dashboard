import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteProjectDialog from "./DeleteProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";

export type Project = {
  id: string;
  name: string;
};

const data: Project[] = [
  {
    id: "m5gr84i9",
    name: "RHINO FWOG",
  },
];

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
          <DeleteProjectDialog />

          <UpdateProjectDialog />
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
  return <DataTable columns={columns} data={data} />;
};

export default ProjectsTable;
