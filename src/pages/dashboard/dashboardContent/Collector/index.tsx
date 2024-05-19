import './index.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from 'antd';
import {
  IconDraft,
  IconQueue,
  IconLaunched,
  IconIDO,
  IconDraftBtn,
  IconQueueBtn,
  IconLaunchedBtn,
} from '@/components/icons';
export const Collector = () => {
  const data = [
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'All',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'Draft',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'Queue',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'IDO',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'Launched',
    },
  ];
  const renderButton = (type: string) => {
    let button;

    switch (type) {
      case 'Draft':
        button = <IconDraftBtn className="DraftBtn" />;
        break;
      case 'Queue':
        button = (
          <Button className="flex items-center justify-between">
            <IconQueueBtn className="QueueBtn" />
            <span className="ml-[9px]">INCREASE</span>
          </Button>
        );
        break;
      case 'IDO':
        button = '';
        break;
      case 'Launched':
        button = (
          <Button className="flex items-center justify-between">
            <IconLaunchedBtn className="LaunchedBtn" />
            <span className="ml-[9px]">CLAIM</span>
          </Button>
        );
        break;
      default:
        button = <Button className="default-button">Default Button</Button>;
        break;
    }

    return button;
  };
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
    <div className="dashboard_items">
      <div className="dashboard_top">
        <div className="dashboard_top_left">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.39552 12.3116C2.82092 12.3116 2.36107 11.8576 2.35938 11.2889C2.35769 10.7532 2.82092 10.3119 3.38792 10.3076C3.94312 10.3034 4.38018 10.7397 4.37428 11.2932C4.36837 11.8796 3.9524 12.3124 3.39467 12.3124L3.39552 12.3116Z"
              fill="black"
            />
            <path
              d="M9.99009 17.4981C7.57121 17.4981 5.15234 17.5006 2.73222 17.4981C1.21071 17.4944 -0.00624241 16.4717 2.40927e-05 14.8048C0.016317 10.7478 0.00127739 6.69091 0.0075439 2.63398C0.0087972 1.34809 0.724432 0.415634 1.95016 0.0922822C2.22839 0.0195907 2.52793 0.00455113 2.8187 0.00455113C7.57247 -0.000462077 12.3275 -0.00422198 17.0825 0.00956433C17.4547 0.00956433 17.8533 0.0885223 18.1942 0.236412C18.6667 0.4407 18.7532 0.921967 18.7231 1.37817C18.6867 1.92711 18.3534 2.3006 17.8708 2.40838C17.639 2.45977 17.3971 2.48985 17.1602 2.48985C12.5832 2.49486 8.00486 2.49361 3.4278 2.49486C3.28242 2.49486 3.13453 2.49862 2.99291 2.5287C2.66955 2.59638 2.47028 2.85205 2.48908 3.15034C2.51039 3.48873 2.71969 3.71307 3.06059 3.74565C3.20597 3.75944 3.3526 3.75568 3.49799 3.75568C8.10637 3.75568 12.716 3.75568 17.3244 3.75568C18.3659 3.75568 19.1993 4.15674 19.6906 5.09671C19.8636 5.42633 19.9764 5.82989 19.9801 6.19962C20.0027 9.15114 20.0077 12.1027 19.9864 15.0529C19.9764 16.4353 18.8133 17.4931 17.372 17.4956C14.9118 17.4994 12.4503 17.4956 9.99009 17.4956V17.4981ZM16.2553 11.8645C16.9772 11.8696 17.5525 11.3494 17.5111 10.6526C17.4648 9.88182 17.0963 9.38927 16.2729 9.36796C15.5685 9.34916 15.0547 9.80035 15.0221 10.6338C14.9945 11.3469 15.5272 11.8583 16.2553 11.8633V11.8645Z"
              fill="black"
            />
          </svg>
          <span className="dashboard_top_left_text">0x4GDD...123e</span>
          <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.6414 8.95892C11.5423 9.1054 11.4766 9.28086 11.35 9.38004C9.68991 10.6739 8.02065 11.9572 6.35293 13.2434C6.11948 13.4235 5.89213 13.4143 5.65868 13.2358C4.00316 11.9556 2.34458 10.68 0.689063 9.39835C0.365588 9.14812 0.348804 8.94518 0.59141 8.53931C2.17217 5.90879 3.7697 3.29047 5.32147 0.644693C5.83109 -0.223501 6.20187 -0.209769 6.70844 0.655374C8.24648 3.27979 9.83333 5.87675 11.3988 8.48591C11.4812 8.62476 11.5468 8.77429 11.6414 8.96044V8.95892ZM1.27498 8.50574C1.27956 8.95892 1.58167 9.10845 1.97228 8.9345C3.19752 8.38673 4.42428 7.83896 5.64189 7.27288C5.91044 7.14776 6.13016 7.15234 6.39412 7.2744C7.61173 7.84049 8.8385 8.38826 10.0607 8.94366C10.3262 9.0642 10.5764 9.0642 10.7061 8.77429C10.8328 8.49049 10.6863 8.29366 10.4147 8.17159C9.03991 7.5521 7.66971 6.92499 6.29037 6.31619C6.14541 6.2521 5.92875 6.23532 5.78837 6.29635C4.37393 6.92041 2.96712 7.56126 1.56641 8.21126C1.42909 8.27535 1.33754 8.44014 1.27651 8.50422L1.27498 8.50574Z"
              fill="black"
            />
            <path
              d="M6.01341 15.1704C6.97926 14.438 7.92832 13.7209 8.87739 13.0022C9.61436 12.4438 10.3544 11.8869 11.0883 11.3223C11.3431 11.127 11.5979 11.0049 11.8665 11.2658C12.135 11.5283 12.013 11.7861 11.8314 12.0455C10.0645 14.5693 8.30215 17.0945 6.53677 19.6197C6.18583 20.1217 5.84862 20.1263 5.50531 19.635C3.72925 17.1006 1.95777 14.5647 0.184759 12.0303C0.0413313 11.8243 -0.0807348 11.6229 0.0672703 11.3681C0.245792 11.0614 0.554009 11.0339 0.911052 11.304C2.06458 12.1752 3.21505 13.0495 4.36552 13.9238C4.90109 14.3297 5.43665 14.7356 6.01189 15.172L6.01341 15.1704Z"
              fill="black"
            />
          </svg>

          <span className="dashboard_top_left_text">8.2905 E</span>
        </div>
        <div>
          <Tabs defaultValue="All">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Draft">Draft</TabsTrigger>
              <TabsTrigger value="Queue">Queue</TabsTrigger>
              <TabsTrigger value="IDO">IDO</TabsTrigger>
              <TabsTrigger value="Launched">Launched</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="dashboard_items_items">
        <div className="dashboard_item_create">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19.168" cy="19.1689" r="17.8047" fill="white" stroke="black" strokeWidth="2" />
            <path
              d="M17.6776 24.8638V14.3518H19.6936V24.8638H17.6776ZM13.3096 20.5678V18.6718H24.0616V20.5678H13.3096Z"
              fill="black"
            />
          </svg>

          <text>Create Token</text>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className="dashboard_item">
              <div className="dashboard_item_tag">
                <div className="dashboard_item_tag_left">SAMPLE</div>
                <div className="dashboard_item_tag_right">
                  <text>{item.type}</text>
                  <div>{renderIcon(item.type)}</div>
                </div>
              </div>
              <div className="dashboard_item_info">
                <img className="dashboard_item_info_img" src={item.imgUrl} alt="" />
                <div className="dashboard_item_info_title">
                  <h3>1</h3>
                  <p>2</p>
                </div>
              </div>
              <div className="dashboard_item_content">
                <div className="dashboard_item_content_left">Total Raised</div>
                <div className="dashboard_item_content_right">6549</div>
              </div>
              <div className="dashboard_item_content">
                <div className="dashboard_item_content_left">Launch Date</div>
                <div className="dashboard_item_content_right">6549</div>
              </div>
              <div className="dashboard_item_content">
                <div className="dashboard_item_content_left">MeMoo Score</div>
                <div className="dashboard_item_content_right">6549</div>
              </div>
              <div className="flex justify-between items-center mt-[15px]">
                <div>{renderButton(item.type)}</div>
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.280762" width="38.5284" height="38.5284" rx="7" fill="#F7F7F7" />
                  <path
                    d="M25.5816 18.1635C25.2488 18.4684 24.9414 18.7296 24.6559 19.0139C21.7439 21.9272 18.8342 24.8416 15.9295 27.7622C15.7412 27.9505 15.5371 28.0562 15.2795 28.106C13.5082 28.4498 11.7382 28.8045 9.96812 29.152C9.87214 29.1714 9.77252 29.1678 9.63281 29.1775C9.70813 28.7729 9.77252 28.4012 9.84663 28.0307C10.1613 26.4696 10.4735 24.9072 10.8003 23.3485C10.8282 23.2137 10.9352 23.0813 11.036 22.9792C13.9359 20.0684 16.8406 17.1612 19.7442 14.2528C20.0078 13.988 20.2727 13.7243 20.5338 13.4571C20.631 13.3575 20.7173 13.3064 20.8376 13.4255C22.3938 14.9805 23.9513 16.5343 25.5816 18.1623V18.1635Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M28.9377 14.7361C28.7214 14.9524 28.4688 15.2075 28.2136 15.4602C27.6767 15.9935 27.1348 16.5208 26.6039 17.0602C26.4569 17.2084 26.3585 17.2509 26.1884 17.0796C24.7099 15.5902 23.2242 14.108 21.7396 12.6259C21.6302 12.5166 21.5513 12.4315 21.7044 12.2809C22.4673 11.5313 23.2205 10.7732 23.9798 10.0188C24.0284 9.97018 24.094 9.93738 24.1292 9.91309C25.7256 11.5143 27.3134 13.1058 28.9377 14.7349V14.7361Z"
                    fill="#CCCCCC"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
