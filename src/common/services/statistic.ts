import apiInstance from "../lib/axios";
import {
  GetImageProductionPerWeekQuery,
  GetImageProductionPerWeekResponse,
} from "./statistic.type";

export const statisticService = {
  getImageProductionPerWeek: async ({
    query,
  }: {
    query: GetImageProductionPerWeekQuery;
  }) => {
    return apiInstance.get<GetImageProductionPerWeekResponse>(
      "/api/v1/statistic/image-production-per-week",
      {
        params: query,
      }
    );
  },
};
