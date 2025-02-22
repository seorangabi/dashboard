import type { Offering } from "@/common/types/offering";
import type { Project } from "@/common/types/project";

export const OFFERING_STATUS_LABEL: Record<Offering["status"], string> = {
	OFFERING: "Offering",
	REJECTED: "Rejected",
	ACCEPTED: "Accepted",
};

export const PROJECT_STATUS_LABEL: Record<Project["status"], string> = {
	DRAFT: "Draft",
	OFFERING: "Offering",
	IN_PROGRESS: "In Progress",
	DONE: "Done",
	CANCELLED: "Cancelled",
};

export const PROJECT_RATIO_LABEL = [
	"STANDART (1:1)",
	"STANDART (16:9)",
	"GIFs (1:1)",
	"PFP (Profile Picture) (1:1)",
	"BANNER (3:1)",
];
