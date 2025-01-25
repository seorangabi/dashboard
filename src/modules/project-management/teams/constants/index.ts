import { TeamRole } from "@/common/types/team";

export const teamRoleLabel: Record<TeamRole, string> = {
	[TeamRole.ADMIN]: "Admin",
	[TeamRole.ARTIST]: "Artist",
	[TeamRole.CODER]: "Coder",
};
