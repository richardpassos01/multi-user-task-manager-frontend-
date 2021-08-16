import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';

export enum UserRoutes {
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
}

const userRoutes: {
  path: UserRoutes;
  component: React.FunctionComponent;
  exact: boolean;
}[] = [
  {
    path: UserRoutes.SIGN_UP,
    component: SignUp,
    exact: true
  },
  {
    path: UserRoutes.SIGN_IN,
    component: SignIn,
    exact: true
  }
];

export default userRoutes;
