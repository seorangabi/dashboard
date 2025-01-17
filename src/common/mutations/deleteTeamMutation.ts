import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	DeleteTeamParam,
	DeleteTeamResponse,
} from "../services/team.type";
import teamService from "../services/team";

type UseDeleteTeamMutationProps = {
	options?: UseMutationOptions<DeleteTeamResponse, unknown, DeleteTeamParam>;
};

const useDeleteTeamMutation = ({ options }: UseDeleteTeamMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (param) => {
			const res = await teamService.deleteTeam({
				param,
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

export default useDeleteTeamMutation;
