import React, { useEffect, useState, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
export const SolanaPortalTop: FC<{ children: ReactNode; updatePortal: number }> = ({ children, updatePortal }) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const modalElement = document.querySelector('.wallet-adapter-modal-wrapper');
          if (modalElement) {
            const modalList = modalElement.querySelector('.wallet-adapter-modal-list');
            if (modalList) {
              const portalContainer = document.createElement('div');
              modalElement.insertBefore(portalContainer, modalList);
              setModalRoot(portalContainer);
              observer.disconnect();
              break;
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [updatePortal]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<div className="portal-div-top">{children}</div>, modalRoot);
};

export const SolanaPortalBottom: FC<{ children: ReactNode; updatePortal: number }> = ({ children, updatePortal }) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const modalElement = document.querySelector('.wallet-adapter-modal') as HTMLDivElement;
          if (modalElement) {
            const targetNode = modalElement.querySelector(
              '.wallet-adapter-modal-wrapper:nth-child(1)',
            ) as HTMLDivElement;
            if (targetNode) {
              setModalRoot(targetNode);
              observer.disconnect();
              break;
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [updatePortal]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<div className="portal-div-bottom">{children}</div>, modalRoot);
};
