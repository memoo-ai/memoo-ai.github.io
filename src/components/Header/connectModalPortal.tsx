import React from 'react';
import ReactDOM from 'react-dom';

const ConnectModalPortal = ({ children }) => {
  const modalRoot = document.querySelector('div[data-rk]');

  if (!modalRoot) {
    console.warn('Modal root element not found');
    return null;
  }

  return ReactDOM.createPortal(<div className="portal-div">{children}</div>, modalRoot);
};

export default ConnectModalPortal;
