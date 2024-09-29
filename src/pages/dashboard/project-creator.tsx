import { useState } from 'react';
import './project-creator.scss';
import IPagination from '@/components/IPagination';
import { Card } from './card';
import Empty from '@/components/Empty';

const pageSize = 12;
const ProjectCreator = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  return (
    <div>
      <h3 className="font-404px text-[18px] leading-[16px] text-green mt-[63px] mb-[33px]">
        PROJECTS CREATED BY THIS CREATOR
      </h3>
      <div>
        {list.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]" />
            </Card>
          );
        })}
        {!list.length && <Empty />}
      </div>{' '}
      <div className="mt-[60px]">
        <IPagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onChangePageNumber={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCreator;
