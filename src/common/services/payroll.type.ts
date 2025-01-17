import type { ApiResponse, DateTime, Pagination } from "../types";
import type { Payroll } from "../types/payroll";

// #region GET /v1/payroll/list
export type GetPayrollListQuery = {
	id_eq?: string;
	team_id_eq?: string;
	status_eq?: "DRAFT" | "PAID";
	with: ("team" | "projects")[];
	skip?: number;
	limit?: number;
	sort?: ("created_at:asc" | "created_at:desc")[];
};
export type GetPayrollListResponse = ApiResponse<{
	docs: Payroll[];
	pagination: Pagination;
}>;
// #endregion

// #region DELETE /v1/payroll/:id
export type DeletePayrollParam = {
	id: string;
};
export type DeletePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion

// #region POST /v1/payroll
export type CreatePayrollBody = {
	periodStart: DateTime;
	periodEnd: DateTime;
	teamId: string;
	status: "DRAFT" | "PAID";
	projectIds: string[];
};
export type CreatePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion

// #region PATCH /v1/payroll
export type UpdatePayrollParam = {
	id: string;
};
export type UpdatePayrollBody = {
	status: "PAID";
};
export type UpdatePayrollResponse = ApiResponse<{ doc: Payroll }>;
// #endregion
