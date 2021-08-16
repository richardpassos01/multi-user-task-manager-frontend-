import Axios, { AxiosResponse } from "axios";
import useAuthentication from "@domain/user/hooks/useAuthentication";
import camelcaseKeys from "camelcase-keys";

const accessTokenInterceptor = () => (request: any) => {
  const { getAccessToken } = useAuthentication();
  const accessToken = getAccessToken();

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
};

const client = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(
  accessTokenInterceptor(),
  (response) => response
);

client.interceptors.response.use(
  (response): AxiosResponse => ({
    ...response,
    data: camelcaseKeys(response.data, { deep: true }),
  }),
  (error) => Promise.reject(error.response)
);

export default client;
