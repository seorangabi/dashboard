import Layout from "@/common/components/Layout";
import TeamDetail from "@/modules/project-management/teams/components/detail";
import type { NextPage } from "next";

const TeamDetailPage: NextPage = () => {
	return (
		<Layout>
			<TeamDetail />
		</Layout>
	);
};

export default TeamDetailPage;
