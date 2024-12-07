import DataTable from "@/common/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useRouter } from "next/router";
import useOfferingListQuery from "@/common/queries/offeringListQuery";
import { Offering } from "@/common/types/offering";
import { OFFERING_STATUS_LABEL } from "../../constants";

export const columns: ColumnDef<Offering>[] = [
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
        {OFFERING_STATUS_LABEL[row.original.status] ??
          row.original.status ??
          "N/A"}
      </div>
    ),
  },
];

const OfferingsTable = () => {
  const router = useRouter();

  const { data: offeringData, isLoading } = useOfferingListQuery({
    query: {
      sort: ["created_at:desc"],
      project_id_eq: router.query.projectId as string,
      with: ["team"],
    },
  });
  const data = useMemo(() => {
    if (!offeringData?.data?.docs?.length) return [];
    return offeringData.data.docs;
  }, [offeringData]);

  return <DataTable isLoading={isLoading} columns={columns} data={data} />;
};

export default OfferingsTable;
