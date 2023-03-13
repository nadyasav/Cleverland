import { IFormMessageEl } from '../../types/custom-types';
import { BaseBtn } from '../base-btn/base-btn';

import styles from './form-message-el.module.css';

export const FormMessageEl = (props: IFormMessageEl) => {
  const handleOnBtnClick = () => {
    if (props.button) {
      props.button.handleBtnClick();
    }
  };

  return (
    <div className={styles.form_message} data-test-id='status-block'>
      <div className={styles.form_message__inner}>
        <p className={styles.form_message__title}>{props.title}</p>

        <p className={styles.form_message__message}>{props.message}</p>
        {props.button && (
          <div className={styles.form_message__btn}>
            <BaseBtn onClick={handleOnBtnClick} stylesInherit={true} type='button'>
              {props.button.title}
            </BaseBtn>
          </div>
        )}
      </div>
    </div>
  );
};
