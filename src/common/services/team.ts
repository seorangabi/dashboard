import apiInstance from "../lib/axios";
import {
  CreateTeamBody,
  CreateTeamResponse,
  DeleteTeamParam,
  DeleteTeamResponse,
  GetTeamListResponse,
  UpdateTeamBody,
  UpdateTeamParam,
  UpdateTeamResponse,
} from "./team.type";

const teamService = {
  getTeamList: async () => {
    return apiInstance.get<GetTeamListResponse>("/api/v1/team/list");
  },
  deleteTeam: async ({ param }: { param: DeleteTeamParam }) => {
    return apiInstance.delete<DeleteTeamResponse>(`api/v1/team/${param.id}`);
  },
  createTeam: async ({ body }: { body: CreateTeamBody }) => {
    return apiInstance.post<CreateTeamResponse>(`api/v1/team`, body);
  },
  updateTeam: async ({
    param,
    body,
  }: {
    param: UpdateTeamParam;
    body: UpdateTeamBody;
  }) => {
    return apiInstance.patch<UpdateTeamResponse>(
      `api/v1/team/${param.id}`,
      body
    );
  },
};

export default teamService;
