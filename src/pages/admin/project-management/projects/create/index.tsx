import Layout from "@/common/components/Layout";
import CreateProject from "@/modules/project-management/projects/components/create";
import type { NextPage } from "next";

const CreateProjectPage: NextPage = () => {
	return (
		<Layout>
			<CreateProject />
		</Layout>
	);
};

export default CreateProjectPage;
