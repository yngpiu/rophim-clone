import { useMenuContext } from '@/hooks/useMenuContext';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
  const { menuIsOpen, toggleMenu } = useMenuContext();

  return (
    <header className={cx('header')}>
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
    </header>
  );
};

export default Header;
