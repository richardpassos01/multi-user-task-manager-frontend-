import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles, { theme } from "./styles";
import PageNotFound from "./screens/PageNotFound";
import { ReactQueryConfigProvider } from "react-query";
import Loader from "./base-components/Loader";

import PublicRoute from "./base-components/PublicRoute";
import Authentication from "./base-components/Authentication";

import userRoutes from "@domain/user/routes";
import projectManagerRoutes from "@domain/project-manager/routes";

const reactQueryConfig = {
  suspense: true,
  useErrorBoundary: false,
  throwOnError: true,
  refetchOnWindowFocus: false,
};

const publicRoutes = [...userRoutes];
const authenticatedRoutes = [...projectManagerRoutes];

const App: React.FunctionComponent = () => (
  <>
    <GlobalStyles />
    <ReactQueryConfigProvider config={reactQueryConfig}>
      <React.Suspense fallback={<Loader />}>
        <Router>
          <ThemeProvider theme={theme}>
            <Switch>
              {publicRoutes.map((publicRoute, index) => (
                <PublicRoute key={index} {...publicRoute} />
              ))}

              <Authentication.NotAuthenticated>
                <Switch>
                  {authenticatedRoutes.map((authenticatedRoute, index) => (
                    <Route key={index} {...authenticatedRoute} />
                  ))}
                  <Route path="*" component={PageNotFound} />
                </Switch>
              </Authentication.NotAuthenticated>
            </Switch>
          </ThemeProvider>
        </Router>
      </React.Suspense>
    </ReactQueryConfigProvider>
  </>
);

export default App;
