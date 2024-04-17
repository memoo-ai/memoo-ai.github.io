import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
const BasicLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Toast />
      <div className={styles.content}>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default BasicLayout;
