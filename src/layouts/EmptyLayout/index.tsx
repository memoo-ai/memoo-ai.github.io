import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const BasicLayout: React.FC = () => {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
};

export default BasicLayout;
