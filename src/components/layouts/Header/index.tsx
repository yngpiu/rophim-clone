import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Navigation from '@/components/Navigation';
import Logo from '@/components/svgs/Logo';
import { useMenuContext } from '@/hooks/useMenuContext';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
  const { menuIsOpen, toggleMenu } = useMenuContext();

  return (
    <header className={cx('header')}>
      <div className={cx('header__left')}>
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
      <Navigation menuIsOpen={menuIsOpen} />
    </header>
  );
};

export default Header;
