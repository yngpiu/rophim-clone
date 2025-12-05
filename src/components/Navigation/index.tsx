import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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
  const navRef = useRef<HTMLElement>(null);
  const activeDropdownRef = useRef<Element | null>(null);

  const handleClick = useCallback(
    (categoryId: string) => {
      setActiveCategory(prev => (prev === categoryId ? '' : categoryId));
    },
    [setActiveCategory]
  );

  // Cache dropdown selector
  const dropdownSelector = useMemo(
    () => `.${styles['nav__dropdown']}.${styles['nav__dropdown--active']}`,
    []
  );
  const itemSelector = useMemo(() => `.${styles['nav__item']}`, []);

  useEffect(() => {
    if (!activeCategory || !navRef.current) {
      activeDropdownRef.current = null;
      return;
    }

    // Cache dropdown element khi activeCategory thay đổi
    activeDropdownRef.current = navRef.current.querySelector(dropdownSelector);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const navElement = navRef.current;

      if (!navElement) return;

      // Kiểm tra click có nằm trong nav không
      if (navElement.contains(target)) {
        const activeDropdown = activeDropdownRef.current;
        const clickedItem = (target as Element).closest(itemSelector);

        // Nếu click trong dropdown hoặc item có dropdown đang mở, không đóng
        if (activeDropdown?.contains(target) || clickedItem?.contains(activeDropdown)) {
          return;
        }

        // Nếu click trong nav nhưng ngoài dropdown, đóng dropdown
        setActiveCategory('');
        return;
      }

      // Click ngoài nav, đóng dropdown
      setActiveCategory('');
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategory, setActiveCategory, dropdownSelector, itemSelector]);

  return (
    <nav
      ref={navRef}
      className={cx('nav', { 'nav--opened': menuIsOpen }, { 'nav--hidden': searchModalIsOpen })}
    >
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
                  'nav__dropdown--active': activeCategory === category?.id,
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
