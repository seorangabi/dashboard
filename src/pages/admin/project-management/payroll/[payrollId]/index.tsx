import Layout from "@/common/components/Layout";
import PayrollDetail from "@/modules/project-management/payroll/components/detail";
import { NextPage } from "next";
import React from "react";

const PayrollDetailPage: NextPage = () => {
  return (
    <Layout>
      <PayrollDetail />
    </Layout>
  );
};

export default PayrollDetailPage;
