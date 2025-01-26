import type { ApiResponse } from "../types";

// #region GET /v1/statistic/image-production-per-week
export type GetImageProductionPerWeekQuery = {
	year: number;
	monthIndex: number;
};
export type ImageProductionPerWeek = {
	start: string;
	end: string;
	teams: {
		id: string;
		name: string | null;
		count: number;
	}[];
};
export type GetImageProductionPerWeekResponse = ApiResponse<{
	docs: ImageProductionPerWeek[];
}>;
// #endregion

// #region GET /v1/statistic/visitor-and-punch-my-head
export type GetVisitorAndPunchMyHeadQuery = {
	year: number;
	monthIndex: number;
};
export type VisitorAndPunchMyHead = {
	date: string;
	visitor: number;
	punchMyHead: number;
};
export type GetVisitorAndPunchMyHeadResponse = ApiResponse<{
	docs: ImageProductionPerWeek[];
}>;
// #endregion
