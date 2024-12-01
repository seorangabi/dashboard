import apiInstance from "../lib/axios";
import {
  CreateProjectBody,
  CreateProjectResponse,
  DeleteProjectParam,
  DeleteProjectResponse,
  GetProjectListResponse,
  UpdateProjectBody,
  UpdateProjectParam,
  UpdateProjectResponse,
} from "./project.type";

const projectService = {
  getProjectList: async () => {
    return apiInstance.get<GetProjectListResponse>("/api/v1/project/list");
  },
  deleteProject: async ({ param }: { param: DeleteProjectParam }) => {
    return apiInstance.delete<DeleteProjectResponse>(
      `api/v1/project/${param.id}`
    );
  },
  createProject: async ({ body }: { body: CreateProjectBody }) => {
    return apiInstance.post<CreateProjectResponse>(`api/v1/project`, body);
  },
  updateProject: async ({
    param,
    body,
  }: {
    param: UpdateProjectParam;
    body: UpdateProjectBody;
  }) => {
    return apiInstance.patch<UpdateProjectResponse>(
      `api/v1/project/${param.id}`,
      body
    );
  },
};

export default projectService;
