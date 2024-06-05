import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './connectModalPortalTop.scss';
const ConnectModalPortal = ({ children, onClose }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const modalElement = document.querySelector('.iekbcc0[data-rk]');
    if (modalElement) {
      const targetNode = modalElement.querySelector(
        'div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(1)',
      );
      setModalRoot(targetNode || modalElement);
    }
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<div className="portal-div-top">{children}</div>, modalRoot);
};

export default ConnectModalPortal;
