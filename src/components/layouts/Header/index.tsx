import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import LogoLink from '@/components/LogoLink';
import MenuToggle from '@/components/layouts/Header/MenuToggle';
import Navigation from '@/components/layouts/Header/Navigation';
import SearchBar from '@/components/layouts/Header/SearchBar';
import { useMenuContext } from '@/hooks/contexts/useMenuContext';
import { useSearchModalContext } from '@/hooks/contexts/useSearchModalContext';

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
      <SearchBar isOpen={searchModalIsOpen} isFixed={isScrolled} onToggle={toggleSearchModal} />
      <Navigation searchModalIsOpen={searchModalIsOpen} />
    </header>
  );
};

export default Header;
