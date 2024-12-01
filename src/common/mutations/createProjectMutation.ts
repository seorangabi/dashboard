import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  CreateProjectBody,
  CreateProjectResponse,
} from "../services/project.type";
import projectService from "../services/project";

type UseCreateProjectMutationProps = {
  options?: UseMutationOptions<
    CreateProjectResponse,
    unknown,
    CreateProjectBody
  >;
};

const useCreateProjectMutation = ({
  options,
}: UseCreateProjectMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const res = await projectService.createProject({
        body,
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

export default useCreateProjectMutation;
