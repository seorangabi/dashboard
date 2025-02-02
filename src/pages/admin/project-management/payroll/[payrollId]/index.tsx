import Layout from "@/common/components/Layout";
import PayrollDetail from "@/modules/project-management/payroll/components/detail";
import type { NextPage } from "next";

const PayrollDetailPage: NextPage = () => {
	return (
		<Layout>
			<PayrollDetail />
		</Layout>
	);
};

export default PayrollDetailPage;
