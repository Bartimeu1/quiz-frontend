import { WelcomePage } from '@pages/welcome';
import { RegistrationPage } from '@pages/registration';
import { LoginPage } from '@pages/login';
import { HomePage } from '@pages/home';
import { ProfilePage } from '@pages/profile';
import { SettingsPage } from '@pages/settings';
import { TestsRoom } from '@pages/tests/tests-room';
import { TestsDetailsPage } from '@pages/tests';

export const routes = {
  home: '/',
  welcome: '/welcome',
  login: '/login',
  register: '/register',
  profile: '/profile',
  settings: '/settings',
  testRoom: '/test-room/:id',
  testDetails: '/test-details/:id',
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
  { path: routes.testRoom, element: <TestsRoom /> },
  { path: routes.testDetails, element: <TestsDetailsPage /> },
];
