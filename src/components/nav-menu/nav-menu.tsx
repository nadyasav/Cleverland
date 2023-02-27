import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setMenuState } from '../../store/menu-slice';

import styles from './nav-menu.module.css';

export const NavMenu = (props: {
  testId: { nav: string; showcase: string; allBooks: string; terms: string; contract: string; prefix: string };
  isMobile?: boolean;
}) => {
  const { category } = useParams();
  const [categoryName, setCategoryName] = useState(category);
  const dispatch = useAppDispatch();
  const { menuState } = useAppSelector((state) => state.menu);
  const [dropdownState, seDropdownState] = useState(true);
  const location = useLocation();
  const { categories } = useAppSelector((state) => state.categories);
  const { cards } = useAppSelector((state) => state.cards);

  useEffect(() => {
    setCategoryName(category);
  }, [category]);

  useEffect(() => {
    seDropdownState(true);
  }, [location]);

  const closeMenu = () => {
    if (props.isMobile) {
      dispatch(setMenuState(false));
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.classList.contains(styles.active)) {
      e.preventDefault();
      seDropdownState(!dropdownState);
    } else {
      closeMenu();
    }
  };

  return (
    <React.Fragment>
      <nav
        className={cn(styles.nav, props.isMobile && styles.modile, menuState && styles.active)}
        data-test-id={props.testId.nav}
      >
        <ul className={styles.nav__list}>
          <li className={cn(styles.dropdown, !categories.length && styles.empty)}>
            <NavLink
              className={({ isActive }) =>
                cn(styles.nav__link, isActive && styles.active, dropdownState && isActive && styles.open)
              }
              to='/books'
              onClick={handleNavLinkClick}
              data-test-id={props.testId.showcase}
            >
              Витрина книг
            </NavLink>
            {categories.length > 0 && (
              <ul className={styles.nav__nested_list}>
                <li>
                  <Link
                    data-test-id={props.testId.allBooks}
                    to='/books/all'
                    className={cn(categoryName === 'all' && styles.active)}
                    onClick={closeMenu}
                  >
                    <span className={styles.category_title}>Все книги</span>
                  </Link>
                </li>
                {categories.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/books/${item.path}`}
                      className={cn(categoryName === item.path && styles.active)}
                      onClick={closeMenu}
                    >
                      <span className={styles.category_title} data-test-id={`${props.testId.prefix}-${item.path}`}>
                        {item.name}
                      </span>
                      <span
                        className={styles.category_count}
                        data-test-id={`${props.testId.prefix}-book-count-for-${item.path}`}
                      >
                        {cards.filter((card) => card.categories?.includes(item.name)).length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => cn(styles.nav__link, isActive && styles.active)}
              to='/terms'
              data-test-id={props.testId.terms}
              onClick={handleNavLinkClick}
            >
              Правила пользования
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => cn(styles.nav__link, isActive && styles.active)}
              to='/contract'
              data-test-id={props.testId.contract}
              onClick={handleNavLinkClick}
            >
              Договор оферты
            </NavLink>
          </li>
        </ul>
        {props.isMobile && (
          <ul className={cn(styles.nav__list, styles.profile)}>
            <li>
              <NavLink
                className={({ isActive }) => cn(styles.nav__link, isActive && styles.active)}
                to='/'
                onClick={handleNavLinkClick}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => cn(styles.nav__link, isActive && styles.active)}
                to='/'
                onClick={handleNavLinkClick}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
      {menuState && (
        <div className={cn(styles.overlay, menuState && styles.active)} onClick={closeMenu} role='presentation' />
      )}
    </React.Fragment>
  );
};
