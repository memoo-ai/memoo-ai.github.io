import { useState, useEffect } from 'react';
import './project-creator.scss';
import IPagination from '@/components/IPagination';
import { Card } from './card';
import Empty from '@/components/Empty';
import { getMemeList } from '@/api/profile';

const pageSize = 12;
interface IProps {
  userAddress: string;
  refresh?: number;
}
const ProjectCreator = ({ userAddress, refresh }: IProps) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    (async () => {
      const { data } = await getMemeList({
        address: userAddress,
        pageNumber: currentPage,
        pageSize: pageSize,
        status: '',
      });

      setList(data?.records ?? []);
      setTotal(data?.total_record ?? 0);
    })();
  }, [userAddress, refresh, currentPage]);
  return (
    <div>
      <h3 className="font-404px text-[18px] leading-[16px] text-green mt-[63px] mb-[33px]">
        PROJECTS CREATED BY THIS CREATOR
      </h3>
      <div>
        <div className="project-creator-content">
          {list &&
            list.length > 0 &&
            list.map((item, index) => {
              return (
                <Card key={index} data={item}>
                  <div className="flex justify-between items-center mt-[15px]" />
                </Card>
              );
            })}
        </div>
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
          top={1145}
        />
      </div>
    </div>
  );
};

export default ProjectCreator;
