import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	UpdateTeamBody,
	UpdateTeamParam,
	UpdateTeamResponse,
} from "../services/team.type";
import teamService from "../services/team";

type UseUpdateTeamMutationProps = {
	options?: UseMutationOptions<
		UpdateTeamResponse,
		unknown,
		UpdateTeamBody & UpdateTeamParam
	>;
};

const useUpdateTeamMutation = ({ options }: UseUpdateTeamMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...body }) => {
			const res = await teamService.updateTeam({
				param: { id },
				body: body,
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

export default useUpdateTeamMutation;
