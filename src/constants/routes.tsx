import { WelcomePage } from '@pages/welcome';
import { RegistrationPage } from '@pages/registration';
import { LoginPage } from '@pages/login';
import { HomePage } from '@pages/home';

export const routes = {
  home: '/',
  welcome: '/welcome',
  login: '/login',
  register: '/register',
  profile: '/profile',
};

export const publicRoutes = [
  { path: routes.welcome, element: <WelcomePage /> },
  { path: routes.register, element: <RegistrationPage /> },
  { path: routes.login, element: <LoginPage /> },
];

export const privateRoutes = [{ path: routes.home, element: <HomePage /> }];
