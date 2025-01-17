import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
	GetPayrollListQuery,
	GetPayrollListResponse,
} from "../services/payroll.type";
import payrollService from "../services/payroll";

type UsePayrollListQueryProps = {
	query?: GetPayrollListQuery;
	options?: Omit<UseQueryOptions<GetPayrollListResponse>, "queryKey">;
};

const usePayrollListQuery = ({
	query,
	options,
}: UsePayrollListQueryProps = {}) => {
	const queryResult = useQuery({
		...options,
		queryKey: ["payroll", "list", query],
		queryFn: async () => {
			const res = await payrollService.getPayrollList({
				query,
			});
			return res.data;
		},
	});

	return queryResult;
};

export default usePayrollListQuery;
