import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	DeleteTaskParam,
	DeleteTaskResponse,
} from "../services/task.type";
import taskService from "../services/task";

type UseDeleteTaskMutationProps = {
	options?: UseMutationOptions<DeleteTaskResponse, unknown, DeleteTaskParam>;
};

const useDeleteTaskMutation = ({ options }: UseDeleteTaskMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (param) => {
			const res = await taskService.deleteTask({
				param,
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

export default useDeleteTaskMutation;
