import './index.scss';
import { Pagination } from 'antd';

export default () => {
  return (
    <div className="i_pagination">
      <Pagination defaultCurrent={1} total={500} showSizeChanger={false} showQuickJumper />
    </div>
  );
};
