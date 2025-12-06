import classNames from 'classnames/bind';

import apiConfig from '@/api/config/apiConfig';

import styles from './LogoImage.module.scss';

const cx = classNames.bind(styles);

interface LogoImageProps {
  alt: string;
  url: string;
  className?: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ url, alt, className }) => {
  return (
    <img src={apiConfig.logoSizes.w500(url)} alt={alt} className={cx('film-logo', className)} />
  );
};

export default LogoImage;
