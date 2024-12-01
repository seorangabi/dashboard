import { ApiResponse } from "../types";
import { Project } from "../types/project";

// #region GET /api/v1/project/list
export type GetProjectListQuery = {
  done_eq?: boolean;
};
export type GetProjectListResponse = ApiResponse<{
  docs: Project[];
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
  artistId: string;
};
export type CreateProjectResponse = ApiResponse<{ doc: Project }>;
// #endregion
