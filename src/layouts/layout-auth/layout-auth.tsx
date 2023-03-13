import { Outlet } from 'react-router-dom';

import styles from './layout-auth.module.css';

export const LayoutAuth = () => (
  <section className={styles.layout_auth} data-test-id='auth'>
    <div className={styles.layout_auth__wrapper}>
      <h1 className={styles.layout_auth__title}>Cleverland</h1>
      <div className={styles.layout_auth__inner}>
        <Outlet />
      </div>
    </div>
  </section>
);
