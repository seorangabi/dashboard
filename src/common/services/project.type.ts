import type { ApiResponse, Pagination } from "../types";
import type { Project } from "../types/project";

// #region GET /v1/project/list
export type GetProjectListQuery = {
	id_eq?: string;
	team_id_eq?: string;
	status_eq?: "OFFERING" | "IN_PROGRESS" | "REVISION" | "DONE";
	is_paid_eq?: boolean;
	with?: ("team" | "payroll")[];
	skip?: number;
	limit?: number;
	sort?: ("created_at:asc" | "created_at:desc")[];
	created_at_gte?: string;
	created_at_lte?: string;
};
export type GetProjectListResponse = ApiResponse<{
	docs: Project[];
	pagination: Pagination;
}>;
// #endregion

// #region DELETE /v1/project/:id
export type DeleteProjectParam = {
	id: string;
	deleteThread?: boolean;
};
export type DeleteProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion

// #region POST /v1/project
export type CreateProjectBody = {
	name: string;
	deadline: string;
	imageRatio: string;
	teamId: string;
	clientName: string;
	confirmationDuration: number;
	note: string;
	tasks: {
		fee: number;
		imageCount: number;
		note: string;
		attachments: string[];
	}[];
	autoNumberTask: boolean;

	isPublished?: boolean; // default: true
};
export type CreateProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion

// #region PATCH /v1/project
export type UpdateProjectParam = {
	id: string;
};
export type UpdateProjectBody = {
	name?: string;
	fee?: number;
	deadline?: string;
	imageRatio?: string;
	note?: string | null;
	teamId?: string;
	clientName?: string;
	status?: Project["status"];
	autoNumberTask?: boolean;
};
export type UpdateProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion
