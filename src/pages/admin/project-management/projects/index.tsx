import Layout from "@/common/components/Layout";
import Projects from "@/modules/project-management/projects/components/main";
import { NextPage } from "next";
import React from "react";

const ProjectsPage: NextPage = () => {
  return (
    <Layout>
      <Projects />
    </Layout>
  );
};

export default ProjectsPage;
