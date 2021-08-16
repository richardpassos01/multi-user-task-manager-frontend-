import api from "@api";
import ENDPOINTS from "./endpoints";
import Project from "../interfaces/Project";


export const create = async (name: string): Promise<void> => {
  await api.post<Project>(ENDPOINTS.CREATE_PROJECT, {
    name,
  });
};

export const update = async (
  name: string,
  projectId: string
): Promise<void> => {
  const endpoint = ENDPOINTS.UPDATE_OR_DELETE_PROJECT.replace(
    ":projectId",
    projectId
  );

  await api.put(endpoint, {
    name,
  });
};

export const remove = async (projectId: string): Promise<void> => {
  const endpoint = ENDPOINTS.UPDATE_OR_DELETE_PROJECT.replace(
    ":projectId",
    projectId
  );

  await api.delete(endpoint);
};

const projectApi = {
  create,
  update,
  remove,
};

export default projectApi;
