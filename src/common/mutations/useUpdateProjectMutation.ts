import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import type {
	UpdateProjectBody,
	UpdateProjectParam,
	UpdateProjectResponse,
} from "../services/project.type";
import projectService from "../services/project";

type UseUpdateProjectMutationProps = {
	options?: UseMutationOptions<
		UpdateProjectResponse,
		unknown,
		UpdateProjectBody & UpdateProjectParam
	>;
};

const useUpdateProjectMutation = ({
	options,
}: UseUpdateProjectMutationProps) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...body }) => {
			const res = await projectService.updateProject({
				param: { id },
				body: body,
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

export default useUpdateProjectMutation;
