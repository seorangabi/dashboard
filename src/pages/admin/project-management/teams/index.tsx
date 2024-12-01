import Layout from "@/common/components/Layout";
import Teams from "@/modules/project-management/teams/components/main";
import { NextPage } from "next";
import React from "react";

const TeamsProject: NextPage = () => {
  return (
    <Layout>
      <Teams />
    </Layout>
  );
};

export default TeamsProject;
