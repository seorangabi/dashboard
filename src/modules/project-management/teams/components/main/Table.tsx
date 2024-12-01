import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteTeamDialog from "./DeleteTeamDialog";
import UpdateTeamDialog from "./UpdateTeamDialog";

export type Team = {
  id: string;
  name: string;
};

const data: Team[] = [
  {
    id: "m5gr84i9",
    name: "Leanne Graham",
  },
];

export const columns: ColumnDef<Team>[] = [
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
          <DeleteTeamDialog />

          <UpdateTeamDialog />
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
  return <DataTable columns={columns} data={data} />;
};

export default TeamsTable;
