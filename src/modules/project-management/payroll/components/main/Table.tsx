import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import type { Payroll } from "@/common/types/payroll";
import DeletePayrollDialog from "./DeletePayrollDialog";
import usePayrollListQuery from "@/common/queries/usePayrollListQuery";
import { format } from "date-fns";
import UpdatePayrollStatusDialog from "./UpdatePayrollStatusDialog";
import useMainPageQueryState from "../../hooks/useMainPageQueryState";
import type { GetPayrollListQuery } from "@/common/services/payroll.type";

export const columns: ColumnDef<Payroll>[] = [
	{
		id: "team",
		header: "Team",
		cell: ({ row }) => (
			<div className="capitalize">{row.original?.team?.name}</div>
		),
	},
	{
		id: "period",
		header: "Period",
		cell: ({ row }) => (
			<div>
				{format(row.original.periodStart, "d MMM yyyy")} -{" "}
				{format(row.original.periodEnd, "d MMM yyyy")}
			</div>
		),
	},
	{
		id: "status",
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div>
				{row.original.status === "PAID" ? (
					"Paid"
				) : (
					<div className="flex items-center gap-x-1">
						<span>
							{row.original.status === "DRAFT" ? "Draft" : row.original.status}
						</span>
						<UpdatePayrollStatusDialog id={row.original.id} />
					</div>
				)}
			</div>
		),
	},
	{
		id: "team",
		header: "Created At",
		cell: ({ row }) => (
			<div className="capitalize">
				{format(row.original.createdAt, "d MMM yyyy")}
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
					<DeletePayrollDialog
						id={row.original.id}
						disabled={row.original.status === "PAID"}
					/>

					<Link
						href={{
							pathname: "/admin/project-management/payroll/[payrollId]",
							query: { payrollId: row.original.id },
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

const PayrollTable = () => {
	const { query, setQuery } = useMainPageQueryState();
	const page = Number.parseInt(query.page);
	const pageSize = Number.parseInt(query.pageSize);

	const { data: payrollData, isLoading } = usePayrollListQuery({
		query: {
			with: ["team"],
			skip: (page - 1) * pageSize,
			limit: pageSize,
			sort: ["created_at:desc"],
			team_id_eq: query.teamId,
			status_eq: query.status as GetPayrollListQuery["status_eq"],
		},
	});
	const data = useMemo(() => {
		if (!payrollData?.data?.docs?.length) return [];
		return payrollData.data.docs;
	}, [payrollData]);

	return (
		<DataTable
			isLoading={isLoading}
			columns={columns}
			data={data}
			pagination={{
				page,
				pageSize,
				hasNextPage: payrollData?.data?.pagination?.hasNext ?? false,
				hasPreviousPage: payrollData?.data?.pagination?.hasPrev ?? false,
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
	);
};

export default PayrollTable;
