import type { DateTime } from ".";
import type { Team } from "./team";

export type Offering = {
	id: string;
	projectId: string;
	teamId: string;
	confirmationDuration: number;
	fee: number;
	note: string | null;
	deadline: DateTime;
	imageRatio: string;
	status: "OFFERING" | "REJECTED" | "ACCEPTED";
	createdAt: DateTime;
	team?: Team;
};
