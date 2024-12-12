import { ApiResponse } from "../types";
import { Offering } from "../types/offering";

// #region GET /v1/offering/list
export type GetOfferingListQuery = {
  project_id_eq?: string;
  sort?: ("created_at:asc" | "created_at:desc")[];
  with?: "team"[];
};
export type GetOfferingListResponse = ApiResponse<{
  docs: Offering[];
}>;
// #endregion
