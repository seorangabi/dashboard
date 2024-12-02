import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  CreateProjectBody,
  CreateProjectResponse,
} from "../services/project.type";
import projectService from "../services/project";
import payrollService from "../services/payroll";
import {
  CreatePayrollBody,
  CreatePayrollResponse,
} from "../services/payroll.type";

type UseCreatePayrollMutationProps = {
  options?: UseMutationOptions<
    CreatePayrollResponse,
    unknown,
    CreatePayrollBody
  >;
};

const useCreatePayrollMutation = ({
  options,
}: UseCreatePayrollMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const res = await payrollService.createPayroll({
        body,
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

export default useCreatePayrollMutation;
