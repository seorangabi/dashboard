import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  UpdateTaskBody,
  UpdateTaskParam,
  UpdateTaskResponse,
} from "../services/task.type";
import taskService from "../services/task";

type UseUpdateTaskMutationProps = {
  options?: UseMutationOptions<
    UpdateTaskResponse,
    unknown,
    UpdateTaskBody & UpdateTaskParam
  >;
};

const useUpdateTaskMutation = ({ options }: UseUpdateTaskMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }) => {
      const res = await taskService.updateTask({
        param: { id },
        body: body,
      });

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
    ...options,
  });
};

export default useUpdateTaskMutation;
