import Layout from "@/common/components/Layout";
import Statistics from "@/modules/project-management/statistics/components/main";
import type { NextPage } from "next";

const StatisticsPage: NextPage = () => {
	return (
		<Layout>
			<Statistics />
		</Layout>
	);
};

export default StatisticsPage;
