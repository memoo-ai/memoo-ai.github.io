import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './connectModalPortal.scss';
const ConnectModalPortalTop = ({ children, onClose }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const modalElement = document.querySelector('.iekbcc0[data-rk]');
    if (modalElement) {
      // const targetNode = modalElement.querySelector('div > div > div > div > div > div > div');
      const targetNode = modalElement.querySelector('div > div > div > div div div:nth-child(1)');
      setModalRoot(targetNode || modalElement);
    }
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<div className="portal-div">{children}</div>, modalRoot);
};

export default ConnectModalPortalTop;
