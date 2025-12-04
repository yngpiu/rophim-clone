import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { categoryList } from '@/data/navigation';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

type NavigationProps = {
  menuIsOpen: boolean;
};

const Navigation = ({ menuIsOpen }: NavigationProps) => {
  return (
    <nav className={cx('navigation', menuIsOpen && 'navigation--opened')}>
      <Link to={{ pathname: 'login' }} className={cx('navigation__login')}>
        <FontAwesomeIcon icon={faUser} />
        Thành viên
      </Link>

      <ul className={cx('navigation__list')}>
        {categoryList.map(category => (
          <li key={category.id} className={cx('navigation__item')}>
            <Link to={{ pathname: category.slug }} className={cx('navigation__link')}>
              {category.name}{' '}
              {category?.subcategories && category.subcategories.length > 0 && (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
