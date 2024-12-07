import { ApiResponse } from "../types";
import { Team } from "../types/team";

// #region GET /api/v1/team/list
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type GetTeamListQuery = {};
export type GetTeamListResponse = ApiResponse<{
  docs: Team[];
}>;
// #endregion

// #region DELETE /api/v1/team/:id
export type DeleteTeamParam = {
  id: string;
};
export type DeleteTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion

// #region POST /api/v1/team
export type CreateTeamBody = {
  name: string;
  discordUserId: string;
  discordChannelId: string;
  bankNumber: string | null;
  bankAccountHolder: string | null;
  bankProvider: string | null;
};
export type CreateTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion

// #region PATCH /api/v1/team
export type UpdateTeamParam = {
  id: string;
};
export type UpdateTeamBody = {
  name?: string;
  discordUserId?: string | null;
  discordChannelId?: string | null;
  bankNumber?: string | null;
  bankAccountHolder?: string | null;
  bankProvider?: string | null;
};
export type UpdateTeamResponse = ApiResponse<{ doc: Team }>;
// #endregion
