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
import { SORT_TYPE } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { setSearchField, setSortType } from '../../../store/filters-slice';

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
  const dispatch = useAppDispatch();
  const [searchFieldState, setSearchFieldState] = useState(false);
  const { sortType } = useAppSelector((state) => state.filters);

  const handleViewOnChange = (value: string) => {
    props.handleViewChange(value);
  };

  const openSearchField = () => {
    setSearchFieldState(true);
  };

  const closeSearchField = () => {
    setSearchFieldState(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortType(e.currentTarget.checked ? SORT_TYPE.desc : SORT_TYPE.asc));
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchField(e.currentTarget.value.trim()));
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
            handleChange={handleSearchFieldChange}
          />
        </div>
        <div className={cn(styles.filers__sort_switcher, searchFieldState && styles.hidden)}>
          <SortSwitcher
            data={dataForSort}
            defaultChecked={sortType === SORT_TYPE.desc ? true : false}
            handleChange={handleSortChange}
          />
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
