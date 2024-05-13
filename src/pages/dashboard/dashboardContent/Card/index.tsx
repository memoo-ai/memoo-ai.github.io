import './index.scss';
import { IconDraft, IconQueue, IconLaunched, IconIDO } from '@/components/icons';
interface CardProps {
  data: any;
  children: any;
}
export const Card = ({ data, children }: CardProps) => {
  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case 'Draft':
        icon = <IconDraft className="Draft" />;
        break;
      case 'Queue':
        icon = <IconQueue className="Queue" />;
        break;
      case 'IDO':
        icon = <IconIDO className="IDO" />;
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
        <div className="dashboard_item_tag_left">SAMPLE</div>
        <div className="dashboard_item_tag_right">
          <h3 className="mr-[11px]">{data.type}</h3>
          <div>{renderIcon(data.type)}</div>
        </div>
      </div>
      <div className="dashboard_item_info">
        {data.imgUrl ? (
          <img className="dashboard_item_info_img" src={data.imgUrl} alt="" />
        ) : (
          <div className="dashboard_item_info_img" />
        )}
        <div className="dashboard_item_info_title">
          <h3>1</h3>
          <p>2</p>
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
