import classNames from 'classnames/bind';

import styles from './MenuToggle.module.scss';

const cx = classNames.bind(styles);

type MenuToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const MenuToggle = ({ isOpen, onToggle }: MenuToggleProps) => {
  return (
    <button
      className={cx('menu-toggle')}
      onClick={onToggle}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <span className={cx('menu-toggle__hamburger', { 'menu-toggle__hamburger--active': isOpen })}>
        <span className={cx('menu-toggle__hamburger-line')} />
        <span className={cx('menu-toggle__hamburger-line')} />
        <span className={cx('menu-toggle__hamburger-line')} />
      </span>
    </button>
  );
};

export default MenuToggle;
