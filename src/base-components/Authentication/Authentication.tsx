import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserRoutes } from "@domain/user/routes";
import useAuthentication from "@domain/user/hooks/useAuthentication";
import { ProjectManagerRoutes } from "@domain/project-manager/routes";

const Authenticated = ({ children }: any) => {
  const { getAccessToken } = useAuthentication();
  const accessToken = getAccessToken();

  const isAuthenticated = !!accessToken;

  if (isAuthenticated) {
    return <Redirect to={ProjectManagerRoutes.DASHBOARD} />;
  }

  return children;
};


const NotAuthenticated = ({ children }: any) => {
  const { getAccessToken } = useAuthentication();
  const accessToken = getAccessToken();

  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    return <Redirect to={UserRoutes.SIGN_IN} />;
  }

  return children;
};

const Authentication = {
  Authenticated,
  NotAuthenticated
}

export default Authentication;
