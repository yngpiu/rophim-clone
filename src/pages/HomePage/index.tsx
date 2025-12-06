import classNames from 'classnames/bind';

import Hero from '@/pages/HomePage/Hero';

import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx('container')} style={{ minHeight: '120vh' }}>
      <Hero />
    </div>
  );
};

export default HomePage;
