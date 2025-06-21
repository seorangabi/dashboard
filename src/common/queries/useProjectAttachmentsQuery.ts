import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { projectAttachmentsApi } from "../services/project-attachment";
import type {
	GetProjectAttachmentsQuery,
	GetProjectAttachmentsResponse,
} from "../services/project-attachment.type";

interface UseProjectAttachmentsQueryOptions {
	query?: GetProjectAttachmentsQuery;
	options?: Omit<UseQueryOptions<GetProjectAttachmentsResponse>, "queryKey">;
}

const useProjectAttachmentsQuery = ({
	query,
	options = {},
}: UseProjectAttachmentsQueryOptions) => {
	return useQuery({
		queryKey: ["project-attachments", query?.projectId],
		queryFn: async () => {
			const res = await projectAttachmentsApi.getProjectAttachments(
				query?.projectId!,
			);
			return res.data;
		},
		enabled: !!query?.projectId,
		...options,
	});
};

export default useProjectAttachmentsQuery;
