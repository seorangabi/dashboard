import { TeamRole } from "@/common/types/team";

export const TEAM_ROLE_LABEL: Record<TeamRole, string> = {
	[TeamRole.ADMIN]: "Admin",
	[TeamRole.ARTIST]: "Artist",
	[TeamRole.CODER]: "Coder",
};
