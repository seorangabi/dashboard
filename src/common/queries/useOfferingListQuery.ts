import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
	GetOfferingListQuery,
	GetOfferingListResponse,
} from "../services/offering.type";
import offeringService from "../services/offering";

type UseOfferingListQueryProps = {
	query?: GetOfferingListQuery;
	options?: Omit<UseQueryOptions<GetOfferingListResponse>, "queryKey">;
};

const useOfferingListQuery = ({
	query,
	options,
}: UseOfferingListQueryProps = {}) => {
	const queryResult = useQuery({
		...options,
		queryKey: ["offering", "list", query],
		queryFn: async () => {
			const res = await offeringService.getOfferingList({
				query,
			});
			return res.data;
		},
	});

	return queryResult;
};

export default useOfferingListQuery;
