import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setMenuState } from '../../store/menu-slice';

import styles from './burger-btn.module.css';

export const BurgerBtn = () => {
  const dispatch = useAppDispatch();
  const { menuState } = useAppSelector((state) => state.menu);

  const handleButtonClick = () => {
    dispatch(setMenuState(!menuState));
  };

  return (
    <button
      className={cn(styles.burger_btn, menuState && styles.active)}
      type='button'
      onClick={handleButtonClick}
      data-test-id='button-burger'
    >
      <div className={styles.burger_btn__inner}>
        <span />
        <span />
        <span />
      </div>
    </button>
  );
};
