import apiInstance from "../lib/axios";
import {
  CreateProjectBody,
  CreateProjectResponse,
  DeleteProjectParam,
  DeleteProjectResponse,
  GetProjectListResponse,
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
};

export default projectService;
