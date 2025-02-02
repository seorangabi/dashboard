import Layout from "@/common/components/Layout";
import Payroll from "@/modules/project-management/payroll/components/main";
import type { NextPage } from "next";

const PayrollPage: NextPage = () => {
	return (
		<Layout>
			<Payroll />
		</Layout>
	);
};

export default PayrollPage;
