import { useState } from 'react';
import cn from 'classnames';

import iconSortAsc from '../../../assets/img/icon-sort-ascending.svg';
import iconSortDesc from '../../../assets/img/icon-sort-descending.svg';
import iconList from '../../../assets/img/icon-view-list.svg';
import iconTile from '../../../assets/img/icon-view-tile.svg';
import loupeIcon from '../../../assets/img/loupe.svg';
import { RadioBtn } from '../../../components/radio-btn/radio-btn';
import { SearchField } from '../../../components/search-field/search-field';
import { SortSwitcher } from '../../../components/sort-switcher/sort-switcher';

import styles from './filters.module.css';

const dataForSort = [
  {
    iconUrl: iconSortAsc,
    title: 'По рейтингу',
  },
  {
    iconUrl: iconSortDesc,
    title: 'По рейтингу',
  },
];

export const Filters = (props: { handleViewChange: (value: string) => void }) => {
  const [searchFieldState, setSearchFieldState] = useState(false);
  const handleViewOnChange = (value: string) => {
    props.handleViewChange(value);
  };

  const openSearchField = () => {
    setSearchFieldState(true);
  };

  const closeSearchField = () => {
    setSearchFieldState(false);
  };

  return (
    <div className={styles.filers}>
      <div className={styles.filers__left}>
        <button
          type='button'
          className={styles.filters__search_btn}
          aria-label='open search field'
          onClick={openSearchField}
          data-test-id='button-search-open'
        >
          <img className={styles.filters__search_btn__loupe} src={loupeIcon} alt='' />
        </button>
        <div className={cn(styles.filers__search_field, searchFieldState && styles.open)}>
          <SearchField
            placeholder='Поиск книги или автора…'
            openOnMobile={searchFieldState}
            closeSearchField={closeSearchField}
          />
        </div>
        <div className={cn(styles.filers__sort_switcher, searchFieldState && styles.hidden)}>
          <SortSwitcher data={dataForSort} defaultChecked={true} />
        </div>
      </div>
      <div className={cn(styles.filers__view, searchFieldState && styles.hidden)}>
        <div className={styles.filers__view_item}>
          <RadioBtn
            handleChange={handleViewOnChange}
            iconUrl={iconTile}
            name='viewType'
            defaultChecked={true}
            value='tile'
            testId='button-menu-view-window'
          />
        </div>
        <div className={styles.filers__view_item}>
          <RadioBtn
            handleChange={handleViewOnChange}
            iconUrl={iconList}
            name='viewType'
            value='list'
            testId='button-menu-view-list'
          />
        </div>
      </div>
    </div>
  );
};
