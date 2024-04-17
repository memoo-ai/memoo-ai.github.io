import React from 'react';
import styles from './index.module.scss';

interface FilterTabProps {
  tabs: string[];
  activeTab?: string;
  onTabChange: (tabId: string) => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ tabs, onTabChange, activeTab = tabs[0] }) => {
  return (
    <div className="flex mb-4 overflow-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn mr-4 ${activeTab === tab ? `${styles.active}` : `${styles.common}`}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTab;
