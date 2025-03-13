import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './constants/routes';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  );
};
