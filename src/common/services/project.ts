import apiInstance from "../lib/axios";
import {
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
    return apiInstance.delete<DeleteProjectResponse>(`/v1/project/${param.id}`);
  },
  createProject: async ({ body }: { body: CreateProjectBody }) => {
    const formData = new FormData();

    // Append top-level fields
    formData.append("name", body.name);
    formData.append("deadline", body.deadline);
    formData.append("imageRatio", body.imageRatio);
    formData.append("teamId", body.teamId);
    formData.append("clientName", body.clientName);

    // Append tasks array
    body.tasks.forEach((task, index) => {
      formData.append(`tasks[${index}][fee]`, task.fee.toString());
      formData.append(
        `tasks[${index}][imageCount]`,
        task.imageCount.toString()
      );
      formData.append(`tasks[${index}][note]`, task.note);
      formData.append(`tasks[${index}][file]`, task.file);
    });

    return apiInstance.post<CreateProjectResponse>(`/v1/project`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // formSerializer: {
      //   // indexes: true,
      //   // dots: true,
      //   indexes: false,
      //   // metaTokens: true,
      // },
    });
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
      body
    );
  },
};

export default projectService;
