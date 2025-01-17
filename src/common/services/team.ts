import apiInstance from "../lib/axios";
import type {
	CreateTeamBody,
	CreateTeamResponse,
	DeleteTeamParam,
	DeleteTeamResponse,
	GetTeamListQuery,
	GetTeamListResponse,
	UpdateTeamBody,
	UpdateTeamParam,
	UpdateTeamResponse,
} from "./team.type";

const teamService = {
	getTeamList: async ({ query }: { query?: GetTeamListQuery }) => {
		return apiInstance.get<GetTeamListResponse>("/v1/team/list", {
			params: query,
		});
	},
	deleteTeam: async ({ param }: { param: DeleteTeamParam }) => {
		return apiInstance.delete<DeleteTeamResponse>(`/v1/team/${param.id}`);
	},
	createTeam: async ({ body }: { body: CreateTeamBody }) => {
		return apiInstance.post<CreateTeamResponse>("/v1/team", body);
	},
	updateTeam: async ({
		param,
		body,
	}: {
		param: UpdateTeamParam;
		body: UpdateTeamBody;
	}) => {
		return apiInstance.patch<UpdateTeamResponse>(`/v1/team/${param.id}`, body);
	},
};

export default teamService;
