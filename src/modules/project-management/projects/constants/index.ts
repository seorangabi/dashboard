import type { Offering } from "@/common/types/offering";
import type { Project } from "@/common/types/project";

export const OFFERING_STATUS_LABEL: Record<Offering["status"], string> = {
	OFFERING: "Offering",
	REJECTED: "Rejected",
	ACCEPTED: "Accepted",
};

export const PROJECT_STATUS_LABEL: Record<Project["status"], string> = {
	OFFERING: "Offering",
	IN_PROGRESS: "In Progress",
	DONE: "Done",
	CANCELLED: "Cancelled",
};
