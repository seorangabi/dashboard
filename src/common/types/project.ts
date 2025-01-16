import { DateTime } from ".";
import { Team } from "./team";

export type Project = {
  id: string;
  name: string;
  fee: number; // default value for Offering
  note: string | null;
  deadline: DateTime; // default value for Offering
  imageRatio: string; // default value for Offering
  status: "OFFERING" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  createdAt: DateTime;
  teamId: string;
  imageCount: number;
  clientName: string;

  isPaid: boolean;
  payrollId: string | null;

  team?: Team; // query with: team
};
