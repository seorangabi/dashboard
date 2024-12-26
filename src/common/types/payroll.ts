import { DateTime } from ".";
import { Project } from "./project";
import { Team } from "./team";

export type Payroll = {
  id: string;
  periodStart: DateTime;
  periodEnd: DateTime;
  amount: number;
  teamId: string;
  status: "DRAFT" | "PAID";
  createdAt: DateTime;
  deletedAt: DateTime | null;
  team?: Team; // query with: team
  projects?: Project[]; // query with: projects
};
