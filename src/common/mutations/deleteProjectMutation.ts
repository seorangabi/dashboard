import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  DeleteProjectParam,
  DeleteProjectResponse,
} from "../services/project.type";
import projectService from "../services/project";

type UseDeleteProjectMutationProps = {
  options?: UseMutationOptions<
    DeleteProjectResponse,
    unknown,
    DeleteProjectParam
  >;
};

const useDeleteProjectMutation = ({
  options,
}: UseDeleteProjectMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param) => {
      const res = await projectService.deleteProject({
        param,
      });

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project"],
      });
    },
    ...options,
  });
};

export default useDeleteProjectMutation;
