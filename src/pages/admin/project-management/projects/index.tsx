import Layout from "@/common/components/Layout";
import Projects from "@/modules/project-management/projects/components/main";
import type { NextPage } from "next";

const ProjectsPage: NextPage = () => {
	return (
		<Layout>
			<Projects />
		</Layout>
	);
};

export default ProjectsPage;
