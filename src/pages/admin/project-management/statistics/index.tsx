import Layout from "@/common/components/Layout";
import Statistics from "@/modules/project-management/statistics/main";
import { NextPage } from "next";
import React from "react";

const StatisticsPage: NextPage = () => {
  return (
    <Layout>
      <Statistics />
    </Layout>
  );
};

export default StatisticsPage;
