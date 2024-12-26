import { Payroll } from "@/common/types/payroll";

export const PAYROLL_STATUS_LABEL: Record<Payroll["status"], string> = {
  DRAFT: "Draft",
  PAID: "Paid",
};
