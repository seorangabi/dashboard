import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	UpdatePayrollBody,
	UpdatePayrollParam,
	UpdatePayrollResponse,
} from "../services/payroll.type";
import payrollService from "../services/payroll";

type UseUpdatePayrollMutationProps = {
	options?: UseMutationOptions<
		UpdatePayrollResponse,
		unknown,
		UpdatePayrollBody & UpdatePayrollParam
	>;
};

const useUpdatePayrollMutation = ({
	options,
}: UseUpdatePayrollMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...body }) => {
			const res = await payrollService.updatePayroll({
				param: { id },
				body: body,
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

export default useUpdatePayrollMutation;
