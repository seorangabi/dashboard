import {
	useMutation,
	type UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import type { CreateProjectAttachmentResponse } from "../services/project-attachment.type";
import { projectAttachmentsApi } from "../services/project-attachment";

type CreateProjectAttachmentParams = {
	projectId: string;
	url: string;
};

type UseCreateProjectAttachmentMutationProps = {
	options?: UseMutationOptions<
		CreateProjectAttachmentResponse,
		unknown,
		CreateProjectAttachmentParams
	>;
};

const useCreateProjectAttachmentMutation = (
	props: UseCreateProjectAttachmentMutationProps,
) => {
	const { options } = props;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params) => {
			const res = await projectAttachmentsApi.createProjectAttachment({
				projectId: params.projectId,
				url: params.url,
			});

			return res.data;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["project-attachments", variables.projectId],
			});
		},
		...options,
	});
};

export default useCreateProjectAttachmentMutation;
