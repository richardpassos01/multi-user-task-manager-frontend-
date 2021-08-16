import api from "@api";
import ENDPOINTS from "./endpoints";
import { Authentication } from "@domain/user/interfaces/Authentication";

export const create = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  await api.post<Authentication>(ENDPOINTS.CREATE, {
    name,
    email,
    password,
  });
};

export const authenticate = async (
  email: string,
  password: string
): Promise<Authentication | void> => {
  const { data } = await api.post<Authentication>(ENDPOINTS.AUTHENTICATE, {
    email,
    password,
  });

  return data;
};

const userApi = {
  create,
  authenticate,
};

export default userApi;
