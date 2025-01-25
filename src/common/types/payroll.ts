import type { DateTime } from ".";
import type { Project } from "./project";
import type { Team } from "./team";

export type Payroll = {
	id: string;
	periodStart: DateTime;
	periodEnd: DateTime;
	amount: number;
	teamId: string;
	status: PayrollStatus;
	createdAt: DateTime;
	deletedAt: DateTime | null;
	team?: Team; // query with: team
	projects?: Project[]; // query with: projects
};

export enum PayrollStatus {
	DRAFT = "DRAFT",
	PAID = "PAID",
}
