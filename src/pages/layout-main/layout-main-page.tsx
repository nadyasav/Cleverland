import { Outlet } from 'react-router-dom';

import { NavMenu } from '../../components/nav-menu/nav-menu';
import { NAVMENU_TEST_ID } from '../../constants';

import styles from './layout-main-page.module.css';

export const LayoutMainPage = () => (
  <section className={styles.layout_main}>
    <div className={styles.layout_main__wrapper}>
      <aside className={styles.sidebar}>
        <NavMenu testId={NAVMENU_TEST_ID.desktop} />
      </aside>
      <Outlet />
    </div>
  </section>
);
