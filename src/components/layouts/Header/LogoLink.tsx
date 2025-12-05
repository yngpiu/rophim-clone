import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Logo from '@/components/svgs/Logo';

import styles from './LogoLink.module.scss';

const cx = classNames.bind(styles);

const LogoLink = () => {
  return (
    <Link to="/" className={cx('logo-link')} aria-label="Trang chủ">
      <Logo className={cx('logo-link__image')} />
    </Link>
  );
};

export default LogoLink;
