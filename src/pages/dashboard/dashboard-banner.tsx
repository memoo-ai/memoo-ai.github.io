import './dashboard-banner.scss';
import { TabType } from '.';

interface IProps {
  title: string;
  desc: string;
  link?: string;
  linkText?: string;
  tabType?: TabType;
  img?: string;
}

export default function DashboardBanner(props: IProps) {
  const { title, desc, img, tabType = 'Collector' } = props;
  return (
    <div className={`dashboard-header-banner-bg dashboard-banner-bg-${tabType}`}>
      {/* <div className="header-banner-bg" style={{ background: `url(${commonBottom.bg})` }}> */}
      <div className="dashboard-header-banner-content">
        <div className="dashboard-header-banner-left flex flex-col">
          <p className="dashboard-left-text">{title}</p>
          <p className="dashboard-left-sub-text">{desc}</p>
        </div>
        <div className="dashboard-header-banner-right">
          <img className={`img-right-${tabType} img-pointer-events`} src={img} alt="" />
        </div>
      </div>
    </div>
  );
}
