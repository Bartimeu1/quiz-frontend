import { WelcomePage } from '@pages/welcome';
import { RegistrationPage } from '@pages/registration';
import { LoginPage } from '@pages/login';

export const routes = {
  base: '/',
  welcome: '/welcome',
  login: '/login',
  register: '/register',
};

export const publicRoutes = [
  { path: routes.welcome, element: <WelcomePage /> },
  { path: routes.register, element: <RegistrationPage /> },
  { path: routes.login, element: <LoginPage /> },
];
