import { DateTime } from ".";
import { Team } from "./team";

export type Project = {
  id: string;
  name: string;
  fee: number; // default value for Offering
  note: string | null; // default value for Offering
  deadline: DateTime; // default value for Offering
  imageRatio: string; // default value for Offering
  status: "OFFERING" | "IN_PROGRESS" | "REVISION" | "DONE";
  createdAt: DateTime;
  teamId: string;
  imageCount: number;

  isPaid: boolean;
  payrollId: string | null;

  team?: Team; // query with: team
};
