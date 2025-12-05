import { faMagnifyingGlass, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Navigation from '@/components/Navigation';
import Logo from '@/components/svgs/Logo';
import { useMenuContext } from '@/hooks/useMenuContext';
import { useSearchModalContext } from '@/hooks/useSearchModalContext';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
  const { menuIsOpen, toggleMenu } = useMenuContext();
  const { searchModalIsOpen, toggleSearchModal } = useSearchModalContext();
  return (
    <header className={cx('header')}>
      <div className={cx('header__left', { 'header__left--hidden': searchModalIsOpen })}>
        <div style={{ position: 'relative' }}>
          <button
            className={cx('menu-toggle')}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuIsOpen}
          >
            <span className={cx('hamburger', { 'hamburger--active': menuIsOpen })}>
              <span className={cx('hamburger__line')}></span>
              <span className={cx('hamburger__line')}></span>
              <span className={cx('hamburger__line')}></span>
            </span>
          </button>
        </div>
        <Link to={{ pathname: '/' }} className={cx('logo')}>
          <Logo className={cx('logo__image')} />
        </Link>
      </div>
      <Navigation menuIsOpen={menuIsOpen} searchModalIsOpen={searchModalIsOpen} />
      <div className={cx('search__container')}>
        <button
          className={cx('search__button', { 'search__button--closed': searchModalIsOpen })}
          onClick={toggleSearchModal}
        >
          {searchModalIsOpen ? (
            <FontAwesomeIcon icon={faXmark} className={cx('search__icon')} />
          ) : (
            <FontAwesomeIcon icon={faSearch} className={cx('search__icon')} />
          )}
        </button>
        <div className={cx('search__input', { 'search__input--active': searchModalIsOpen })}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search__input-icon')} />
          <input
            type="text"
            className={cx('search__input-field')}
            placeholder="Tìm kiếm phim, diễn viên,..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
