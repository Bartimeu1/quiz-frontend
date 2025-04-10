import { WelcomePage } from '@pages/welcome';
import { RegistrationPage } from '@pages/registration';
import { LoginPage } from '@pages/login';
import { HomePage } from '@pages/home';
import { ProfilePage } from '@pages/profile';
import { SettingsPage } from '@pages/settings';
import { TestsDetailsPage } from '@pages/tests';

export const routes = {
  home: '/',
  welcome: '/welcome',
  login: '/login',
  register: '/register',
  profile: '/profile',
  settings: '/settings',
  tests: '/tests',
  testsDetails: '/tests/:id',
};

export const publicRoutes = [
  { path: routes.welcome, element: <WelcomePage /> },
  { path: routes.register, element: <RegistrationPage /> },
  { path: routes.login, element: <LoginPage /> },
];

export const privateRoutes = [
  { path: routes.home, element: <HomePage /> },
  { path: routes.settings, element: <SettingsPage /> },
  {
    path: routes.profile,
    element: <ProfilePage />,
  },
  { path: routes.testsDetails, element: <TestsDetailsPage /> },
];
