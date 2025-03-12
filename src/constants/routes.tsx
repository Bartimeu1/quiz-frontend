import { WelcomePage } from '@pages/welcome';

export const routes = {
  base: '/',
  welcome: '/welcome',
  login: '/login',
  register: '/register',
};

export const publicRoutes = [
  { path: routes.welcome, element: <WelcomePage /> },
];
