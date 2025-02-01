import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
	GetTeamListQuery,
	GetTeamListResponse,
} from "../services/team.type";
import teamService from "../services/team";

type UseTeamListQueryProps = {
	query?: GetTeamListQuery;
	options?: Omit<UseQueryOptions<GetTeamListResponse>, "queryKey">;
};

const useTeamListQuery = ({ query, options }: UseTeamListQueryProps = {}) => {
	const queryResult = useQuery({
		...options,
		queryKey: ["team", "list", query],
		queryFn: async () => {
			const res = await teamService.getTeamList({
				query,
			});
			return res.data;
		},
	});

	return queryResult;
};

export default useTeamListQuery;
