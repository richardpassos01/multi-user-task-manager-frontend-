import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const PublicRoute: React.FunctionComponent<RouteProps> = ({
  component: Component,
  ...props
}: any) => {
  return <Route {...props} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
