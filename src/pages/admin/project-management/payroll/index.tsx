import Layout from "@/common/components/Layout";
import Payroll from "@/modules/project-management/payroll/components/main";
import { NextPage } from "next";
import React from "react";

const PayrollPage: NextPage = () => {
  return (
    <Layout>
      <Payroll />
    </Layout>
  );
};

export default PayrollPage;
