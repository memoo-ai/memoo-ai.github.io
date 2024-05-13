import { useCallback, useState } from 'react';
import './index.scss';
import { Pagination, InputNumber } from 'antd';
interface PaginationProps {
  total: number;
  onChangePageNumber: (page: number) => void;
}
export default ({ total, onChangePageNumber }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleKeyDown = useCallback(
    (e) => {
      setCurrentPage(e);
      onChangePageNumber(e);
    },
    [currentPage],
  );
  return (
    <div className="i_pagination">
      <Pagination
        // current={currentPage}
        defaultCurrent={1}
        total={total}
        showSizeChanger={false}
        showQuickJumper={false}
      />
      <div className="options">
        <span>Go To</span>{' '}
        <InputNumber
          // onKeyDown={handleKeyDown}
          className="options_ipt"
          controls={false}
          placeholder="e.g. 10"
          style={{ color: '#07E993' }}
        />
      </div>
    </div>
  );
};
