import apiInstance from "../lib/axios";
import {
  CreatePayrollBody,
  CreatePayrollResponse,
  DeletePayrollParam,
  DeletePayrollResponse,
  GetPayrollListQuery,
  GetPayrollListResponse,
  UpdatePayrollBody,
  UpdatePayrollParam,
  UpdatePayrollResponse,
} from "./payroll.type";

const payrollService = {
  getPayrollList: async ({ query }: { query?: GetPayrollListQuery }) => {
    return apiInstance.get<GetPayrollListResponse>("/v1/payroll/list", {
      params: query,
    });
  },
  deletePayroll: async ({ param }: { param: DeletePayrollParam }) => {
    return apiInstance.delete<DeletePayrollResponse>(
      `/v1/payroll/${param.id}`
    );
  },
  createPayroll: async ({ body }: { body: CreatePayrollBody }) => {
    return apiInstance.post<CreatePayrollResponse>(`/v1/payroll`, body);
  },
  updatePayroll: async ({
    param,
    body,
  }: {
    param: UpdatePayrollParam;
    body: UpdatePayrollBody;
  }) => {
    return apiInstance.patch<UpdatePayrollResponse>(
      `/v1/payroll/${param.id}`,
      body
    );
  },
};

export default payrollService;
