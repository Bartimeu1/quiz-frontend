import { Outlet } from 'react-router-dom';

import { Header } from '@components/header';
import { Footer } from '@components/footer';

import styles from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
