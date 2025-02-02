import Layout from "@/common/components/Layout";
import CreatePayroll from "@/modules/project-management/payroll/components/create";
import type { NextPage } from "next";

const CreatePayrollPage: NextPage = () => {
	return (
		<Layout>
			<CreatePayroll />
		</Layout>
	);
};

export default CreatePayrollPage;
