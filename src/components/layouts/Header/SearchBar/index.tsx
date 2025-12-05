import { faMagnifyingGlass, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type SearchBarProps = {
  isOpen: boolean;
  isFixed: boolean;
  onToggle: () => void;
};

const SearchBar = ({ isOpen, isFixed, onToggle }: SearchBarProps) => {
  return (
    <div className={cx('search-bar')}>
      <button
        className={cx('search-bar__button', { 'search-bar__button--closed': isOpen })}
        onClick={onToggle}
        aria-label={isOpen ? 'Đóng thanh tìm kiếm' : 'Mở thanh tìm kiếm'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} className={cx('search-bar__icon')} />
        ) : (
          <FontAwesomeIcon icon={faSearch} className={cx('search-bar__icon')} />
        )}
      </button>
      <div
        className={cx('search-bar__input', {
          'search-bar__input--active': isOpen,
          'search-bar__input--fixed': isFixed,
        })}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-bar__input-icon')} />
        <input
          type="text"
          className={cx('search-bar__input-field')}
          placeholder="Tìm kiếm phim, diễn viên,..."
          aria-label="Tìm kiếm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
