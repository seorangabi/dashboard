import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { CreateTeamBody, CreateTeamResponse } from "../services/team.type";
import teamService from "../services/team";

type UseCreateTeamMutationProps = {
  options?: UseMutationOptions<CreateTeamResponse, unknown, CreateTeamBody>;
};

const useCreateTeamMutation = ({ options }: UseCreateTeamMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const res = await teamService.createTeam({
        body,
      });

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team"],
      });
    },
    ...options,
  });
};

export default useCreateTeamMutation;
