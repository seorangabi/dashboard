import Layout from "@/common/components/Layout";
import MonthPickerInput from "@/common/components/MonthPickerInput";
import Statistics from "@/modules/website-management/statistics/components/main";
import React, { useState } from "react";

const StatisticsPage = () => {
	return (
		<Layout>
			<Statistics />
		</Layout>
	);
};

export default StatisticsPage;
