import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { statisticService } from "../services/statistic";
import {
  GetImageProductionPerWeekQuery,
  GetImageProductionPerWeekResponse,
} from "../services/statistic.type";

type UseImageProductionPerWeekQueryProps = {
  query: GetImageProductionPerWeekQuery;
  options?: Omit<
    UseQueryOptions<GetImageProductionPerWeekResponse>,
    "queryKey"
  >;
};

const useImageProductionPerWeekQuery = ({
  query,
  options,
}: UseImageProductionPerWeekQueryProps) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["statistic", "image-production-per-week", query],
    queryFn: async () => {
      const res = await statisticService.getImageProductionPerWeek({
        query,
      });
      return res.data;
    },
  });

  return queryResult;
};

export default useImageProductionPerWeekQuery;
