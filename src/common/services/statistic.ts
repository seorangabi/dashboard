import apiInstance from "../lib/axios";
import type {
	GetImageProductionPerWeekQuery,
	GetImageProductionPerWeekResponse,
	GetVisitorAndPunchMyHeadQuery,
	GetVisitorAndPunchMyHeadResponse,
} from "./statistic.type";

export const statisticService = {
	getImageProductionPerWeek: async ({
		query,
	}: {
		query: GetImageProductionPerWeekQuery;
	}) => {
		return apiInstance.get<GetImageProductionPerWeekResponse>(
			"/v1/statistic/image-production-per-week",
			{
				params: query,
			},
		);
	},
	getVisitorAndPunchMyHead: async ({
		query,
	}: {
		query: GetVisitorAndPunchMyHeadQuery;
	}) => {
		return apiInstance.get<GetVisitorAndPunchMyHeadResponse>(
			"/v1/statistic/visitor-and-punch-my-head",
			{
				params: query,
			},
		);
	},
};
