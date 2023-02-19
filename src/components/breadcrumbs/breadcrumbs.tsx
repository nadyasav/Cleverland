import { NavLink } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs = (props: { baseUrl: string; items: Array<{id: number, path: string, name: string}> }) => {
  let pathStr = props.baseUrl;

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__wrapper}>
        <ul className={styles.breadcrumbs__list}>
          {props.items.map(
            (item) => {
              pathStr += `/${item.path}`

              return (
                <li className={styles.breadcrumbs__item} key={item.id}>
                  <NavLink className={styles.breadcrumbs__link} to={pathStr}>
                    {item.name}
                  </NavLink>
                </li>
              )
            }
          )}
        </ul>
      </div>
    </div>
)};
