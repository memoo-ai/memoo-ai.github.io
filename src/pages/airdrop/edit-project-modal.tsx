import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useState } from 'react';
import './airdrop-claim-modal.scss';

const EditProjectModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title={
          <div className="flex items-center gap-x-[13px]">
            <span className="text-[24px] leading-6 font-404px">Edit Info</span>
            <img src="/create/icon-edit-project-title.png" />
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="edit_project flex flex-col">
          <Button className="memoo_button mt-4 h-[50px]">Save</Button>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </>
  );
};

EditProjectModal.displayName = EditProjectModal.name;

export default EditProjectModal;
