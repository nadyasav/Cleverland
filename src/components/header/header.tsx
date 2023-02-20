import { NavLink } from 'react-router-dom';

import avatar from '../../assets/img/avatar.jpg';
import logo from '../../assets/img/logo.svg';
import { NAVMENU_TEST_ID, ROUTES } from '../../constants';
import { BurgerBtn } from '../burger-btn/burger-btn';
import { NavMenu } from '../nav-menu/nav-menu';

import styles from './header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.header__wrapper}>
      <NavLink to={ROUTES.main} className={styles.header__logo_box}>
        <img className={styles.header__logo} src={logo} alt='logo' />
      </NavLink>
      <div className={styles.header__menu_btn}>
        <BurgerBtn />
      </div>
      <h1 className={styles.header__title}>Библиотека</h1>
      <div className={styles.header__user}>
        <p className={styles.header__user_name}>Привет, Иван!</p>
        <div className={styles.header__user_img__box}>
          <img className={styles.header__user_img} src={avatar} alt='avatar' />
        </div>
      </div>
      <NavMenu testId={NAVMENU_TEST_ID.mobile} isMobile={true} />
    </div>
  </header>
);
