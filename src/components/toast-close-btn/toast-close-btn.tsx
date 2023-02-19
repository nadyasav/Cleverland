import styles from './toast-close-btn.module.css';

export const ToastCloseBtn = ({ closeToast }: any) => (
  <button type='button' onClick={closeToast} className={styles.close_btn}>
    <span className={styles.close_btn__line} />
    <span className={styles.close_btn__line} />
  </button>
);
