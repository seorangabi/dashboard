import { Offering } from "@/common/types/offering";

export const OFFERING_STATUS_LABEL: Record<Offering["status"], string> = {
  OFFERING: "Offering",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};
