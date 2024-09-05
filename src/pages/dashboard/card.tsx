import './card.scss';
import { IconDraft, IconQueue, IconLaunched, IconIMO } from '@/components/icons';
import { IDOStatus } from '@/types';
import { useNavigate } from 'react-router-dom';
import { formatTs } from '@/utils';
interface CardProps {
  data: any;
  children: any;
  participated?: boolean;
}
export const Card = ({ data, children, participated = false }: CardProps) => {
  const navigate = useNavigate();
  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case 'Draft':
        icon = <IconDraft className="Draft" />;
        break;
      case 'QUEUE':
        icon = <IconQueue className="Queue" />;
        break;
      case 'Waiting_for_pay':
        icon = <IconQueue className="Queue" />;
        break;
      case 'IDO':
        icon = <IconIMO className="IDO" />;
        break;
      case 'Launched':
        icon = <IconLaunched className="Launched" />;
        break;
      case 'IDOEND':
        icon = <IconLaunched className="Launched" />;
        break;
      default:
        icon = '';
        break;
    }

    return icon;
  };

  const renderStatus = (status: IDOStatus) => {
    let statusText = '';
    switch (status) {
      case 'Draft':
        statusText = 'Draft';
        break;
      case 'Waiting_for_pay':
        statusText = 'IN QUEUE';
        break;
      case 'QUEUE':
        statusText = 'IN QUEUE';
        break;
      case 'IDO':
        statusText = 'IMO';
        break;
      case 'Launched':
        statusText = 'Launched';
        break;
      case 'IDOEND':
        statusText = 'Launched';
        break;
      default:
        statusText = '';
        break;
    }

    return statusText;
  };
  return (
    <div
      className="dashboard_item"
      onClick={() => {
        if (data.status !== 'Draft') {
          navigate(`/airdrop/${data.ticker}`);
        }
      }}
    >
      <div className="dashboard_item_tag">
        <div className="dashboard_item_tag_left" />
        {/* <div className="dashboard_item_tag_left">SAMPLE</div> */}
        <div className="dashboard_item_tag_right">
          <h3 className="mr-[11px]" style={{ color: data.status === 'Draft' ? '#7d83b5' : '#b53bff' }}>
            {renderStatus(data.status)}
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
        <div className="dashboard_item_content_right">{data.launchDate ? formatTs(data.launchDate ?? 0) : ''}</div>
      </div>
      <div className="dashboard_item_content">
        <div className="dashboard_item_content_left">MeMoo Score</div>
        <div className="dashboard_item_content_right">{data.memooScore}/100</div>
      </div>
      {participated && (
        <div className="dashboard_item_content">
          <div className="dashboard_item_content_left">Contributed</div>
          <div className="dashboard_item_content_right">{data.contributed ?? 0}</div>
        </div>
      )}
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
};
