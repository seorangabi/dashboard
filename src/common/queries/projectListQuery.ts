import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  GetProjectListQuery,
  GetProjectListResponse,
} from "../services/project.type";
import projectService from "../services/project";

type UseProjectListQueryProps = {
  query?: GetProjectListQuery;
  options?: Omit<UseQueryOptions<GetProjectListResponse>, "queryKey">;
};

const useProjectListQuery = ({
  query,
  options,
}: UseProjectListQueryProps = {}) => {
  const queryResult = useQuery({
    ...options,
    queryKey: ["project", "list", query],
    queryFn: async () => {
      const res = await projectService.getProjectList();
      return res.data;
    },
  });

  return queryResult;
};

export default useProjectListQuery;
