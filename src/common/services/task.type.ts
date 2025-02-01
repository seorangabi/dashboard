import type { ApiResponse } from "../types";
import type { Task } from "../types/task";

// #region GET /v1/task/list
export type GetTaskListQuery = {
	project_id_eq?: string;
	sort?: ("created_at:asc" | "created_at:desc")[];
};
export type GetTaskListResponse = ApiResponse<{
	docs: Task[];
}>;
// #endregion

// #region DELETE /v1/task/:id
export type DeleteTaskParam = {
	id: string;
};
export type DeleteTaskResponse = ApiResponse<{ doc: Task }>;
// #endregion

// #region POST /v1/task
export type CreateTaskBody = {
	projectId: string;
	fee: number;
	imageCount: number;
	note: string;
	attachmentUrl: string;
};
export type CreateTaskResponse = ApiResponse<{ doc: Task }>;
// #endregion

// #region PATCH /v1/task
export type UpdateTaskParam = {
	id: string;
};
export type UpdateTaskBody = {
	fee?: number;
	imageCount?: number;
	note?: string;
	attachments?: string[];
};
export type UpdateTaskResponse = ApiResponse<{ doc: Task }>;
// #endregion
