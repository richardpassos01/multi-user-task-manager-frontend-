import api from "@api";
import ENDPOINTS from "./endpoints";
import Project from "../interfaces/Project";

export const create = async (
  description: string,
  projectId: string,
): Promise<void> => {
  const endpoint = ENDPOINTS.CREATE_TASK.replace(':projectId', projectId);

  await api.post<Project>(endpoint, {
    description,
  });
};

export const remove = async (
  taskId: string,
  projectId: string
): Promise<void> => {
  const endpoint = ENDPOINTS.DELETED_TASK.replace(':projectId', projectId).replace(':id', taskId);

  await api.delete<Project>(endpoint);
};

export const complete = async (
  taskId: string,
  projectId: string
): Promise<void> => {
  const endpoint = ENDPOINTS.COMPLETE_TASK.replace(':projectId', projectId).replace(':id', taskId);

  await api.patch<Project>(endpoint);
};

const projectApi = {
  create,
  remove,
  complete
};

export default projectApi;
