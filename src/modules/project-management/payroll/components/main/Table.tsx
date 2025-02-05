import DataTable from "@/common/components/Table";
import { Button } from "@/common/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import type { Payroll } from "@/common/types/payroll";
import DeletePayrollDialog from "./DeletePayrollDialog";
import usePayrollListQuery from "@/common/queries/usePayrollListQuery";
import { endOfDay, format, startOfDay } from "date-fns";
import UpdatePayrollStatusDialog from "./UpdatePayrollStatusDialog";
import useMainPageQueryState from "../../hooks/useMainPageQueryState";
import type { GetPayrollListQuery } from "@/common/services/payroll.type";
import { TableCell, TableFooter, TableRow } from "@/common/components/ui/table";
import { formatRupiah } from "@/common/lib/utils";

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
		size: 200,
		cell: ({ row }) => (
			<div>
				{format(row.original.periodStart, "d MMM yyyy")} -{" "}
				{format(row.original.periodEnd, "d MMM yyyy")}
			</div>
		),
	},
	{
		id: "status",
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
		id: "amount",
		header: () => {
			return <div className="text-right">Amount</div>;
		},
		cell: ({ row }) => (
			<div className="text-right">{formatRupiah(row.original.amount)}</div>
		),
	},
	{
		id: "actions",
		header: () => {
			return <div className="text-center">Actions</div>;
		},
		size: 150,
		cell: ({ row }) => {
			return (
				<div className="flex gap-x-2 justify-center">
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
	const { query } = useMainPageQueryState();

	const { data: payrollData, isLoading } = usePayrollListQuery({
		query: {
			with: ["team"],
			sort: ["created_at:desc"],
			team_id_eq: query.teamId,
			status_eq: query.status as GetPayrollListQuery["status_eq"],
			period_start_gte: new Date(startOfDay(query.periodStart)).toISOString(),
			period_end_lte: new Date(endOfDay(query.periodEnd)).toISOString(),
		},
	});

	const { docs, totalAmount } = useMemo(() => {
		if (!payrollData?.data?.docs?.length) return { docs: [], totalAmount: 0 };

		const docs = payrollData?.data?.docs;
		let totalAmount = 0;

		for (const payroll of docs) {
			totalAmount += payroll.amount;
		}

		return { docs, totalAmount };
	}, [payrollData]);

	return (
		<div>
			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={docs}
				footerComponent={
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className="text-right">
								{formatRupiah(totalAmount)}
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableFooter>
				}
			/>
		</div>
	);
};

export default PayrollTable;
