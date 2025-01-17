import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type { CreateTaskBody, CreateTaskResponse } from "../services/task.type";
import taskService from "../services/task";

type UseCreateTaskMutationProps = {
	options?: UseMutationOptions<CreateTaskResponse, unknown, CreateTaskBody>;
};

const useCreateTaskMutation = ({ options }: UseCreateTaskMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (body) => {
			const res = await taskService.createTask({
				body,
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

export default useCreateTaskMutation;
