import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	DeletePayrollParam,
	DeletePayrollResponse,
} from "../services/payroll.type";
import payrollService from "../services/payroll";

type UseDeletePayrollMutationProps = {
	options?: UseMutationOptions<
		DeletePayrollResponse,
		unknown,
		DeletePayrollParam
	>;
};

const useDeletePayrollMutation = ({
	options,
}: UseDeletePayrollMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (param) => {
			const res = await payrollService.deletePayroll({
				param,
			});

			return res.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["payroll"],
			});
		},
		...options,
	});
};

export default useDeletePayrollMutation;
