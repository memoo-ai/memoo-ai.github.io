import React, { useCallback, useEffect, useState } from 'react';
import './index.scss';
import { Pagination, InputNumber } from 'antd';

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize?: number;
  onChangePageNumber: (page: number) => void;
}

const MyPagination = ({ total, currentPage, pageSize = 11, onChangePageNumber }: PaginationProps) => {
  const [localPage, setLocalPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const totalPages = Math.ceil(total / pageSize);
  useEffect(() => {
    setLocalPage(currentPage);
  }, [currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      onChangePageNumber(page);
    },
    [onChangePageNumber],
  );

  const handleInputChange = useCallback(
    (value: number | null) => {
      if (value && value > 0 && value <= totalPages) {
        setInputValue(value);
      } else if (value && value > totalPages) {
        setInputValue(totalPages);
      }
    },
    [totalPages, inputValue],
  );

  const handleEnter = useCallback(() => {
    if (inputValue !== undefined) {
      onChangePageNumber(inputValue);
    }
  }, [inputValue, onChangePageNumber]);

  return (
    <div className="i_pagination">
      <Pagination
        defaultCurrent={1}
        total={total}
        showSizeChanger={false}
        showQuickJumper={false}
        current={localPage}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      <div className="options">
        <span>Go To</span>{' '}
        <InputNumber
          className="options_ipt"
          controls={false}
          placeholder="e.g. 10"
          style={{ color: '#07E993' }}
          value={inputValue}
          onChange={(value) => handleInputChange(value)}
          onPressEnter={handleEnter}
        />
      </div>
    </div>
  );
};

export default MyPagination;
