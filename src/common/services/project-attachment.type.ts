import type { ProjectAttachment } from "../types/project-attachment";

// #region GET /v1/project-attachments/:projectId
export type GetProjectAttachmentsQuery = {
	projectId: string;
};
export type GetProjectAttachmentsResponse = {
	docs: ProjectAttachment[];
};
// #endregion

// #region POST /v1/project-attachments
export type CreateProjectAttachmentBody = {
	projectId: string;
	url: string;
};
export type CreateProjectAttachmentResponse = { doc: ProjectAttachment };
// #endregion

// #region DELETE /v1/project-attachments/:attachmentId
export type DeleteProjectAttachmentQuery = {
	attachmentId: string;
	projectId?: string; // Optional, if needed for context
};
export type DeleteProjectAttachmentResponse = {};
// #endregion
