import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";

const PayrollDetailBreadcrumb = () => {
	return (
		<Breadcrumb className="print:hidden">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/admin/project-management">
						Project Management
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/admin/project-management/payroll">
						Payroll
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Payroll Detail</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default PayrollDetailBreadcrumb;
