import type { DateTime } from ".";
import type { Payroll } from "./payroll";
import type { Team } from "./team";

export type Project = {
	id: string;
	name: string;
	fee: number; // default value for Offering
	note: string | null;
	deadline: DateTime; // default value for Offering
	imageRatio: string; // default value for Offering
	status: ProjectStatus;
	teamId: string;
	imageCount: number;
	clientName: string;

	isPaid: boolean;
	payrollId: string | null;
	autoNumberTask: boolean;

	publishedAt: DateTime | null;
	createdAt: DateTime;

	team?: Team; // query with: team
	payroll?: Payroll; // query with: payroll
};

export enum ProjectStatus {
	DRAFT = "DRAFT",
	OFFERING = "OFFERING",
	IN_PROGRESS = "IN_PROGRESS",
	SUBMITTED = "SUBMITTED",
	DONE = "DONE",
	CANCELLED = "CANCELLED",
}
