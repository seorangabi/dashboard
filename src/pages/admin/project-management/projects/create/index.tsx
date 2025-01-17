import Layout from "@/common/components/Layout";
import CreateProject from "@/modules/project-management/projects/components/create";
import type { NextPage } from "next";
import React from "react";

const CreateProjectPage: NextPage = () => {
	return (
		<Layout>
			<CreateProject />
		</Layout>
	);
};

export default CreateProjectPage;
