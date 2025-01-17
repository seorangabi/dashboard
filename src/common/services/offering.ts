import apiInstance from "../lib/axios";
import type {
	GetOfferingListQuery,
	GetOfferingListResponse,
} from "./offering.type";

const offeringService = {
	getOfferingList: async ({ query }: { query?: GetOfferingListQuery }) => {
		return apiInstance.get<GetOfferingListResponse>("/v1/offering/list", {
			params: query,
		});
	},
};

export default offeringService;
