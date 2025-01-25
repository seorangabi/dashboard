import type { ApiResponse } from "../types";
import type { Team, TeamRole } from "../types/team";

// #region GET /v1/team/list
export type GetTeamListQuery = {};
export type GetTeamListResponse = ApiResponse<{
	docs: Team[];
}>;
// #endregion

// #region DELETE /v1/team/:id
export type DeleteTeamParam = {
	id: string;
};
export type DeleteTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion

// #region POST /v1/team
export type CreateTeamBody = {
	name: string;
	role: TeamRole;
	discordUserId: string;
	discordChannelId: string;
	bankNumber: string | null;
	bankAccountHolder: string | null;
	bankProvider: string | null;
};
export type CreateTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion

// #region PATCH /v1/team
export type UpdateTeamParam = {
	id: string;
};
export type UpdateTeamBody = {
	name?: string;
	role?: TeamRole;
	discordUserId?: string | null;
	discordChannelId?: string | null;
	bankNumber?: string | null;
	bankAccountHolder?: string | null;
	bankProvider?: string | null;
};
export type UpdateTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion
