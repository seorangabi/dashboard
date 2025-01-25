import type { DateTime } from ".";
import type { Team } from "./team";

export type Project = {
	id: string;
	name: string;
	fee: number; // default value for Offering
	note: string | null;
	deadline: DateTime; // default value for Offering
	imageRatio: string; // default value for Offering
	status: ProjectStatus;
	createdAt: DateTime;
	teamId: string;
	imageCount: number;
	clientName: string;

	isPaid: boolean;
	payrollId: string | null;

	team?: Team; // query with: team
};

export enum ProjectStatus {
	OFFERING = "OFFERING",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE",
	CANCELLED = "CANCELLED",
}
