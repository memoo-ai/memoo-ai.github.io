import { useState, Children, cloneElement, isValidElement } from 'react';

import './index.scss';
import { Modal, Button, Checkbox, Slider } from 'antd';
import { IconClose } from '@/components/icons';
export const IncreaseConfirm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  return (
    <div>
      <Modal
        title="Increase Acquisition"
        open={open}
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
        width={604}
        destroyOnClose
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="flex  mt-[39px] items-center">
          <div className="increase_unlocked">
            <h3>Pre-Market Acquisition </h3>
            <p>Creator can increase initial allocation from 5% to 35%.</p>
          </div>
          <div className="flex-1 flex items-center">
            <div>0.05ETH</div> <Slider className="flex-1" min={5} max={35} tooltip={{ open: true }} />
            <div>1.4ETH</div>
          </div>
        </div>
        <div className="claimable">
          <div className="claimable_left">Pre-Market Acquisition</div>
          <div className="claimable_right">
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-[10px]"
            >
              <path
                d="M10.2825 8.24882C10.1949 8.37818 10.1369 8.53316 10.0251 8.62075C8.5589 9.7635 7.08464 10.8968 5.61172 12.0328C5.40554 12.1919 5.20475 12.1838 4.99857 12.0261C3.53644 10.8955 2.07161 9.76889 0.60948 8.63692C0.323791 8.41592 0.308968 8.23669 0.523234 7.87823C1.91934 5.55499 3.33026 3.24253 4.70076 0.90581C5.15085 0.139033 5.47831 0.151161 5.92571 0.915243C7.28408 3.23309 8.68557 5.52669 10.0682 7.83106C10.141 7.95369 10.1989 8.08576 10.2825 8.25016V8.24882ZM1.12695 7.84858C1.131 8.24881 1.39782 8.38088 1.7428 8.22725C2.82491 7.74347 3.90837 7.25969 4.98375 6.75973C5.22092 6.64923 5.41498 6.65327 5.64811 6.76108C6.72348 7.26103 7.80694 7.74482 8.88636 8.23534C9.12084 8.3418 9.34185 8.3418 9.45639 8.08576C9.56824 7.8351 9.43887 7.66127 9.199 7.55346C7.98483 7.00634 6.77469 6.45248 5.55647 5.91479C5.42845 5.85819 5.2371 5.84337 5.11312 5.89727C3.8639 6.44844 2.62143 7.01442 1.38434 7.5885C1.26306 7.6451 1.1822 7.79064 1.1283 7.84723L1.12695 7.84858Z"
                fill="black"
              />
              <path
                d="M5.31096 13.735C6.16398 13.0881 7.00218 12.4548 7.84038 11.8201C8.49127 11.3268 9.14485 10.835 9.79304 10.3364C10.0181 10.1639 10.2431 10.0561 10.4803 10.2865C10.7175 10.5183 10.6097 10.746 10.4493 10.9751C8.88881 13.204 7.33234 15.4343 5.77318 17.6645C5.46324 18.1079 5.16542 18.1119 4.86222 17.678C3.29362 15.4397 1.72907 13.2 0.163176 10.9616C0.0365032 10.7797 -0.0713038 10.6018 0.0594122 10.3768C0.21708 10.1059 0.489293 10.0817 0.804628 10.3202C1.8234 11.0897 2.83949 11.8618 3.85557 12.634C4.32857 12.9925 4.80157 13.3509 5.30961 13.7363L5.31096 13.735Z"
                fill="black"
              />
            </svg>
            1.4 ETH
          </div>
        </div>
        <div>
          <Checkbox
            onChange={() => {
              setIsAccept(!isAccept);
            }}
            className="my-[24px]"
          >
            I accept MeMoo’s terms & conditions.
          </Checkbox>
        </div>
        <Button>CONFIRM</Button>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </div>
  );
};
