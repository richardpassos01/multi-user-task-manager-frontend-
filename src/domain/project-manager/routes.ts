import Dashboard from './screens/Dashboard';

export enum ProjectManagerRoutes {
    DASHBOARD = '/dashboard',
  }

const projectManagerRoutes: {
  path: ProjectManagerRoutes;
  component: React.FunctionComponent;
  exact: boolean;
}[] = [
  {
    path: ProjectManagerRoutes.DASHBOARD,
    component: Dashboard,
    exact: true
  }
];

export default projectManagerRoutes;
