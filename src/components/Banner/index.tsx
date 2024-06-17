import './index.scss';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
interface IProps {
  title: string;
  desc: string;
  link?: string;
  linkText?: string;
  bgType?: 1 | 2;
  img?: string;
}

export default function CommonBanner(props: IProps) {
  const { title, desc, img, link, linkText, bgType = 1 } = props;
  const navigate = useNavigate();
  return (
    <div className={`common-banner-bg common-banner-bg-${bgType}`}>
      <div className="common-banner">
        <p className="common-banner-title">{title}</p>
        <p className="common-banner-desc">{desc}</p>
        {/* <img src={img} /> */}
        {link && (
          <Button variant="primary" className="w-[300px] h-[50px] uppercase" onClick={() => navigate(link)}>
            {linkText}
          </Button>
        )}
      </div>
    </div>
  );
}
