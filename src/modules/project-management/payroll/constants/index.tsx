import { Project } from "@/common/types/project";

export const PROJECT_STATUS_LABEL: Record<Project["status"], string> = {
  OFFERING: "Offering",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELLED: "Cancelled",
};
