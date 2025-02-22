import apiInstance from "../lib/axios";
import type {
	CreateProjectBody,
	CreateProjectResponse,
	DeleteProjectParam,
	DeleteProjectResponse,
	GetProjectListQuery,
	GetProjectListResponse,
	UpdateProjectBody,
	UpdateProjectParam,
	UpdateProjectResponse,
} from "./project.type";

const projectService = {
	getProjectList: async ({ query }: { query?: GetProjectListQuery }) => {
		return apiInstance.get<GetProjectListResponse>("/v1/project/list", {
			params: query,
		});
	},
	deleteProject: async ({ param }: { param: DeleteProjectParam }) => {
		const { id, ...restParam } = param;
		return apiInstance.delete<DeleteProjectResponse>(`/v1/project/${id}`, {
			params: {
				...restParam,
			},
		});
	},
	createProject: async ({ body }: { body: CreateProjectBody }) => {
		return apiInstance.post<CreateProjectResponse>("/v1/project", body);
	},
	updateProject: async ({
		param,
		body,
	}: {
		param: UpdateProjectParam;
		body: UpdateProjectBody;
	}) => {
		return apiInstance.patch<UpdateProjectResponse>(
			`/v1/project/${param.id}`,
			body,
		);
	},
};

export default projectService;
