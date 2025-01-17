import Layout from "@/common/components/Layout";
import CreatePayroll from "@/modules/project-management/payroll/components/create";
import type { NextPage } from "next";
import React from "react";

const CreatePayrollPage: NextPage = () => {
	return (
		<Layout>
			<CreatePayroll />
		</Layout>
	);
};

export default CreatePayrollPage;
