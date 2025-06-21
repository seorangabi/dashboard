import apiInstance from "../lib/axios";
import type {
	CreateProjectAttachmentBody,
	CreateProjectAttachmentResponse,
	GetProjectAttachmentsResponse,
	DeleteProjectAttachmentResponse,
} from "./project-attachment.type";

export const projectAttachmentsApi = {
	getProjectAttachments: (projectId: string) =>
		apiInstance.get<GetProjectAttachmentsResponse>(
			`/v1/project-attachments/${projectId}`,
		),

	createProjectAttachment: (data: CreateProjectAttachmentBody) =>
		apiInstance.post<CreateProjectAttachmentResponse>(
			"/v1/project-attachments",
			data,
		),

	deleteProjectAttachment: (attachmentId: string) =>
		apiInstance.delete<DeleteProjectAttachmentResponse>(
			`/v1/project-attachments/${attachmentId}`,
		),
};
