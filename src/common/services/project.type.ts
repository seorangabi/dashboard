import { ApiResponse, Pagination } from "../types";
import { Project } from "../types/project";

// #region GET /api/v1/project/list
export type GetProjectListQuery = {
  id_eq?: string;
  team_id_eq?: string;
  status_eq?: "OFFERING" | "IN_PROGRESS" | "REVISION" | "DONE";
  is_paid_eq?: boolean;
  with?: "team"[];
  skip?: number;
  limit?: number;
  sort?: ("created_at:asc" | "created_at:desc")[];
};
export type GetProjectListResponse = ApiResponse<{
  docs: Project[];
  pagination: Pagination;
}>;
// #endregion

// #region DELETE /api/v1/project/:id
export type DeleteProjectParam = {
  id: string;
};
export type DeleteProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion

// #region POST /api/v1/project
export type CreateProjectBody = {
  name: string;
  fee: number;
  deadline: string;
  imageRatio: string;
  note?: string;
  teamId: string;
  clientName: string;
};
export type CreateProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion

// #region PATCH /api/v1/project
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
};
export type UpdateProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion
