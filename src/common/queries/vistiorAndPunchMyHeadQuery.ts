import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { statisticService } from "../services/statistic";
import type {
	GetVisitorAndPunchMyHeadQuery,
	GetVisitorAndPunchMyHeadResponse,
} from "../services/statistic.type";

type UseVisitorAndPunchMyHeadQueryProps = {
	query: GetVisitorAndPunchMyHeadQuery;
	options?: Omit<UseQueryOptions<GetVisitorAndPunchMyHeadResponse>, "queryKey">;
};

const useVisitorAndPunchMyHeadQuery = ({
	query,
	options,
}: UseVisitorAndPunchMyHeadQueryProps) => {
	const queryResult = useQuery({
		...options,
		queryKey: ["statistic", "visitor-and-punch-my-head-query", query],
		queryFn: async () => {
			const res = await statisticService.getVisitorAndPunchMyHead({
				query,
			});
			return res.data;
		},
	});

	return queryResult;
};

export default useVisitorAndPunchMyHeadQuery;
