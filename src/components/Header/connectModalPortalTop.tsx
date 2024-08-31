import React, { useEffect, useState, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './connectModalPortalTop.scss';
const ConnectModalPortal: FC<{ children: ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  const [modalRoot, setModalRoot] = useState<any>(null);

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
