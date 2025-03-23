import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './constants/routes';
import { ToastContainer } from 'react-toastify';

import { ProtectedRoute } from '@components/protected-route';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isPrivate />}>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<ProtectedRoute />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  );
};
