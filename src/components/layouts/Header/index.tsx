import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import LogoLink from '@/components/layouts/Header/LogoLink';
import MenuToggle from '@/components/layouts/Header/MenuToggle';
import SearchBar from '@/components/layouts/Header/SearchBar';
import { useMenuContext } from '@/hooks/useMenuContext';
import { useSearchModalContext } from '@/hooks/useSearchModalContext';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
  const { menuIsOpen, setMenuIsOpen, toggleMenu } = useMenuContext();
  const { searchModalIsOpen, toggleSearchModal } = useSearchModalContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchModalIsOpen) {
      setMenuIsOpen(false);
    }
  }, [searchModalIsOpen, setMenuIsOpen]);

  return (
    <header className={cx('header', { 'header--fixed': isScrolled })}>
      <div className={cx('header__left', { 'header__left--hidden': searchModalIsOpen })}>
        <MenuToggle isOpen={menuIsOpen} onToggle={toggleMenu} />
        <LogoLink />
      </div>
      <Navigation searchModalIsOpen={searchModalIsOpen} />
      <SearchBar isOpen={searchModalIsOpen} isFixed={isScrolled} onToggle={toggleSearchModal} />
    </header>
  );
};

export default Header;
