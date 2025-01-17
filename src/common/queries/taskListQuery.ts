import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
	GetTaskListQuery,
	GetTaskListResponse,
} from "../services/task.type";
import taskService from "../services/task";

type UseTaskListQueryProps = {
	query?: GetTaskListQuery;
	options?: Omit<UseQueryOptions<GetTaskListResponse>, "queryKey">;
};

const useTaskListQuery = ({ query, options }: UseTaskListQueryProps = {}) => {
	const queryResult = useQuery({
		...options,
		queryKey: ["task", "list", query],
		queryFn: async () => {
			const res = await taskService.getTaskList({
				query,
			});
			return res.data;
		},
	});

	return queryResult;
};

export default useTaskListQuery;
