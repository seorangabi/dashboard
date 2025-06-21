import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { projectAttachmentsApi } from "../services/project-attachment";
import type {
	DeleteProjectAttachmentQuery,
	DeleteProjectAttachmentResponse,
} from "../services/project-attachment.type";

type UseDeleteProjectMutationProps = {
	options?: UseMutationOptions<
		DeleteProjectAttachmentResponse,
		unknown,
		DeleteProjectAttachmentQuery
	>;
};

const useDeleteProjectAttachmentMutation = (
	props: UseDeleteProjectMutationProps,
) => {
	const { options } = props;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ attachmentId }) => {
			const res =
				await projectAttachmentsApi.deleteProjectAttachment(attachmentId);
			return res.data;
		},
		onSuccess: (data, variables) => {
			if (variables.projectId) {
				queryClient.invalidateQueries({
					queryKey: ["project-attachments", variables.projectId],
				});
			}
		},
		...options,
	});
};

export default useDeleteProjectAttachmentMutation;
