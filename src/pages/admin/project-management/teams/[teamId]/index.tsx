import Layout from "@/common/components/Layout";
import TeamDetail from "@/modules/project-management/teams/components/detail";
import { NextPage } from "next";
import React from "react";

const TeamDetailPage: NextPage = () => {
  return (
    <Layout>
      <TeamDetail />
    </Layout>
  );
};

export default TeamDetailPage;
