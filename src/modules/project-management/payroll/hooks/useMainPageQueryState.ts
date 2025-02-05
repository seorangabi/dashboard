import { endOfWeek, format, startOfWeek } from "date-fns";
import { useRouter } from "next/router";

type Query = {
	teamId?: string;
	status?: string;
	periodStart: string;
	periodEnd: string;
};

const useMainPageQueryState = () => {
	const router = useRouter();

	const teamId = (router.query.teamId || undefined) as string | undefined;
	const status = (router.query.status || undefined) as string | undefined;
	const periodStart = (router.query.periodStart ||
		format(
			startOfWeek(new Date(), {
				weekStartsOn: 1,
			}),
			"yyyy-MM-dd",
		)) as string;
	const periodEnd = (router.query.periodEnd ||
		format(
			endOfWeek(new Date(), {
				weekStartsOn: 1,
			}),
			"yyyy-MM-dd",
		)) as string;

	return {
		query: {
			teamId,
			status,
			periodStart,
			periodEnd,
		},
		setQuery: (query: Partial<Query>) => {
			router.push({
				query: {
					...query,
				},
			});
		},
	};
};

export default useMainPageQueryState;
