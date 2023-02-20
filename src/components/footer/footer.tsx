import { socialLinks } from './social-links';

import styles from './footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__wrapper}>
      <div className={styles.footer__inner}>
        <p className={styles.footer__copyright}>© 2020-2023 Cleverland. Все права защищены.</p>
        <ul className={styles.footer__social}>
          {socialLinks.map(
            (item) =>
              <li className={styles.footer__social_item} key={item.name}>
                <a className={styles.footer__social_link} href={item.link}>
                  <img
                      className={styles.footer__social_img}
                      src={`${item.icon}`}
                      alt={item.name}
                    />
                </a>
              </li>
          )}
        </ul>
      </div>
    </div>
  </footer>
);
