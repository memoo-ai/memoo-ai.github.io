import './index.scss';
import { IconDraft, IconQueue, IconLaunched, IconIMO } from '@/components/icons';
import { CreatorList } from '../type';
interface CardProps {
  data: CreatorList;
  children: any;
}
export const Card = ({ data, children }: CardProps) => {
  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case 'Draft':
        icon = <IconDraft className="Draft" />;
        break;
      case 'QUEUE':
        icon = <IconQueue className="Queue" />;
        break;
      case 'IMO':
        icon = <IconIMO className="IMO" />;
        break;
      case 'Launched':
        icon = <IconLaunched className="Launched" />;
        break;
      default:
        icon = '';
        break;
    }

    return icon;
  };
  return (
    <div className="dashboard_item">
      <div className="dashboard_item_tag">
        <div className="dashboard_item_tag_left" />
        {/* <div className="dashboard_item_tag_left">SAMPLE</div> */}
        <div className="dashboard_item_tag_right">
          <h3 className="mr-[11px]" style={{ color: data.status === 'Draft' ? '#7d83b5' : '#b53bff' }}>
            {data.status}
          </h3>
          <div>{renderIcon(data.status)}</div>
        </div>
      </div>
      <div className="dashboard_item_info">
        {data.icon ? (
          <img className="dashboard_item_info_img" src={data.icon} alt="" />
        ) : (
          <div className="dashboard_item_info_img" />
        )}
        <div className="dashboard_item_info_title">
          <h3>{data.tokenName}</h3>
          <p>{data.ticker}</p>
        </div>
      </div>
      <div className="dashboard_item_content">
        <div className="dashboard_item_content_left">Total Raised</div>
        <div className="dashboard_item_content_right">{data.totalRaised}</div>
      </div>
      <div className="dashboard_item_content">
        <div className="dashboard_item_content_left">Launch Date</div>
        <div className="dashboard_item_content_right">{data.launchDate}</div>
      </div>
      <div className="dashboard_item_content">
        <div className="dashboard_item_content_left">MeMoo Score</div>
        <div className="dashboard_item_content_right">{data.meMooScore}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
