import { Outlet } from 'react-router-dom';

import { Header } from '@components/header';

import styles from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
