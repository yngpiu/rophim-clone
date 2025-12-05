import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { categoryList } from '@/data/navigation';
import { useMenuContext } from '@/hooks/contexts/useMenuContext';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

type NavigationProps = {
  searchModalIsOpen: boolean;
};

const Navigation = ({ searchModalIsOpen }: NavigationProps) => {
  const { menuIsOpen, activeCategory, setActiveCategory, setMenuIsOpen } = useMenuContext();
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const prevPathnameRef = useRef<string>(location.pathname);

  const handleClick = useCallback(
    (categoryId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setActiveCategory(prev => (prev === categoryId ? '' : categoryId));
    },
    [setActiveCategory]
  );

  // Đóng menu và dropdown khi route thay đổi (chỉ khi pathname thực sự thay đổi)
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      setActiveCategory('');
      setMenuIsOpen(false);
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, setActiveCategory, setMenuIsOpen]);

  // Gộp logic click outside cho cả menu và dropdown
  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    // Chỉ lắng nghe khi có menu mở hoặc dropdown mở
    if (!menuIsOpen && !activeCategory) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const targetElement = target as Element;

      // Kiểm tra click có nằm trong nav không
      if (navElement.contains(target)) {
        // Kiểm tra click có nằm trong nav item không
        const clickedItem = targetElement.closest(`.${styles['nav__item']}`);

        if (activeCategory && clickedItem) {
          // Lấy categoryId từ data attribute hoặc từ dropdown
          const itemDropdown = clickedItem.querySelector(`.${styles['nav__dropdown']}`);
          const isActiveItem = itemDropdown?.classList.contains(styles['nav__dropdown--active']);

          // Nếu click vào item có dropdown đang mở, để handleClick xử lý toggle
          if (isActiveItem) {
            return;
          }

          // Nếu click trong dropdown của item khác, đóng dropdown hiện tại
          if (itemDropdown?.contains(target)) {
            return;
          }
        }

        // Click trong nav nhưng không phải item có dropdown đang mở, đóng dropdown
        if (activeCategory) {
          setActiveCategory('');
        }
        return;
      }

      // Click ngoài nav
      // Kiểm tra có phải menu toggle button không
      const isMenuToggle = targetElement.closest('[aria-label="Toggle navigation menu"]');
      if (isMenuToggle) return;

      // Đóng cả menu và dropdown
      if (menuIsOpen) setMenuIsOpen(false);
      if (activeCategory) setActiveCategory('');
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuIsOpen, activeCategory, setMenuIsOpen, setActiveCategory]);

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
            onClick={e => handleClick(category?.id ?? '', e)}
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
