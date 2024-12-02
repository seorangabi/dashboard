import { Project } from "@/common/types/project";

export const PROJECT_STATUS: Record<Project["status"], string> = {
  OFFERING: "Offering",
  IN_PROGRESS: "In Progress",
  REVISION: "Revision",
  DONE: "Done",
};
