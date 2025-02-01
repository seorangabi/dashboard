import React from "react";
import PayrollDetailBreadcrumb from "./Breadcrumb";
import usePayrollListQuery from "@/common/queries/usePayrollListQuery";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";

const PayrollDetail = () => {
	const router = useRouter();

	const payrollId = router.query.payrollId as string;

	const { data } = usePayrollListQuery({
		query: {
			id_eq: payrollId,
			with: ["team", "projects"],
		},
		options: {
			enabled: !!payrollId,
		},
	});

	const payroll = data?.data?.docs?.[0];

	return (
		<div>
			<PayrollDetailBreadcrumb />

			<div className="mt-10 print:hidden">
				<Button
					onClick={() => {
						window.print();
					}}
				>
					Print
				</Button>
			</div>

			<div
				id="payslip"
				className="max-w-xl mt-4 border px-3 py-4 print:max-w-none"
			>
				<div className="text-lg font-medium text-center">
					Payslip (Lempar Tankap Project)
				</div>
				<hr className="my-4 mb-2" />

				<div className="text-center">
					Period:{" "}
					{payroll?.periodStart && format(payroll?.periodStart, "d MMM yyyy")} -{" "}
					{payroll?.periodEnd && format(payroll?.periodEnd, "d MMM yyyy")}
				</div>

				<hr className="my-4 mt-2" />

				<div className="grid grid-cols-[100px_1fr]">
					<div>Name</div>
					<div>: {payroll?.team?.name ?? "N/A"}</div>
					<div>Bank</div>
					<div>
						: {payroll?.team?.bankProvider} {payroll?.team?.bankNumber} /{" "}
						{payroll?.team?.bankAccountHolder}
					</div>
				</div>

				<hr className="my-4" />

				<table className="w-full">
					<thead>
						<tr>
							<th className="text-left">Project</th>
							<th className="text-left">Date</th>
							<th className="text-left">Total</th>
						</tr>
					</thead>
					<tbody>
						{payroll?.projects?.map((project) => (
							<tr key={project.id}>
								<td className="py-2">{project.name}</td>
								<td className="py-2">
									{format(project.createdAt, "d MMM yyyy")}
								</td>
								<td className="py-2">
									Rp {project.fee.toLocaleString("id-ID")}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="border-t">
						<tr>
							<th className="text-left py-4" colSpan={2}>
								Total
							</th>
							<th className="text-left py-4">
								Rp {payroll?.amount.toLocaleString("id-ID")}
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default PayrollDetail;
