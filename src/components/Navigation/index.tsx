import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { categoryList } from '@/data/navigation';
import { useMenuContext } from '@/hooks/useMenuContext';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

type NavigationProps = {
  searchModalIsOpen: boolean;
};

const Navigation = ({ searchModalIsOpen }: NavigationProps) => {
  const { menuIsOpen, activeCategory, setActiveCategory } = useMenuContext();

  const visibleCategory = menuIsOpen ? activeCategory : '';

  const handleClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? '' : categoryId);
  };

  return (
    <nav className={cx('nav', { 'nav--opened': menuIsOpen }, { 'nav--hidden': searchModalIsOpen })}>
      <Link to={{ pathname: 'login' }} className={cx('nav__login')}>
        <FontAwesomeIcon icon={faUser} />
        Thành viên
      </Link>

      <ul className={cx('nav__list')}>
        {categoryList.map(category => (
          <li
            key={category.id}
            className={cx('nav__item')}
            onClick={() => handleClick(category?.id ?? '')}
          >
            {category?.subcategories && category.subcategories.length > 0 ? (
              <span className={cx('nav__link')}>
                {category.name} <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : (
              <Link to={{ pathname: category.slug }} className={cx('nav__link')}>
                {category.name}
              </Link>
            )}
            {category?.subcategories && category.subcategories.length > 0 && (
              <div
                className={cx('nav__dropdown', {
                  'nav__dropdown--active': visibleCategory === category?.id,
                  'nav__dropdown--single-column': category.id === '5',
                })}
              >
                <ul className={cx('nav__sublist')}>
                  {category.subcategories.map(subcategory => (
                    <li key={subcategory.id} className={cx('nav__subitem')}>
                      <Link
                        to={{ pathname: `/the-loai/${subcategory.slug}` }}
                        className={cx('nav__sublink')}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
