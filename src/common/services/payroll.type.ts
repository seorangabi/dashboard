import { ApiResponse, DateTime } from "../types";
import { Payroll } from "../types/payroll";

// #region GET /api/v1/payroll/list
export type GetPayrollListQuery = {
  id_eq?: string;
  team_id_eq?: string;
  status_eq?: "DRAFT" | "PAID";
  with: "team"[];
};
export type GetPayrollListResponse = ApiResponse<{
  docs: Payroll[];
}>;
// #endregion

// #region DELETE /api/v1/payroll/:id
export type DeletePayrollParam = {
  id: string;
};
export type DeletePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion

// #region POST /api/v1/payroll
export type CreatePayrollBody = {
  periodStart: DateTime;
  periodEnd: DateTime;
  teamId: string;
  status: "DRAFT" | "PAID";
  projectIds: string[];
};
export type CreatePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion

// #region PATCH /api/v1/payroll
export type UpdatePayrollParam = {
  id: string;
};
export type UpdatePayrollBody = {
  status: "PAID";
};
export type UpdatePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion
