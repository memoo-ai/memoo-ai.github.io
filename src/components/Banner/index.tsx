import './index.scss';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
interface IProps {
  title: string;
  desc: string;
  link?: string;
  linkText?: string;
}

export default (props: IProps) => {
  const { title, desc, link, linkText } = props;
  const navigate = useNavigate();
  return (
    <div className="common-banner">
      <p className="common-banner-title">{title}</p>
      <p className="common-banner-desc">{desc}</p>
      {link && (
        <Button variant="secondary" className="w-[300px] h-[50px] uppercase" onClick={() => navigate(link)}>
          {linkText}
        </Button>
      )}
    </div>
  );
};
