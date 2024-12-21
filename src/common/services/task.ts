import apiInstance from "../lib/axios";
import {
  CreateTaskBody,
  CreateTaskResponse,
  DeleteTaskParam,
  DeleteTaskResponse,
  GetTaskListQuery,
  GetTaskListResponse,
  UpdateTaskBody,
  UpdateTaskParam,
  UpdateTaskResponse,
} from "./task.type";

const taskService = {
  getTaskList: async ({ query }: { query?: GetTaskListQuery }) => {
    return apiInstance.get<GetTaskListResponse>("/v1/task/list", {
      params: query,
    });
  },
  deleteTask: async ({ param }: { param: DeleteTaskParam }) => {
    return apiInstance.delete<DeleteTaskResponse>(`/v1/task/${param.id}`);
  },
  createTask: async ({ body }: { body: CreateTaskBody }) => {
    return apiInstance.post<CreateTaskResponse>(`/v1/task`, body);
  },
  updateTask: async ({
    param,
    body,
  }: {
    param: UpdateTaskParam;
    body: UpdateTaskBody;
  }) => {
    return apiInstance.patch<UpdateTaskResponse>(`/v1/task/${param.id}`, body);
  },
};

export default taskService;
