import EmptyIcon from './assets/empty-icon.png';
import EmptyLogo from './assets/empty-logo.png';
import './index.scss';

const Empty = () => {
  return (
    <div className="i_empty flex items-center flex-col justify-center">
      <img src={EmptyIcon} alt="" />
      <img className="my-[20px]" src={EmptyLogo} alt="" />
      <h5 className="font-404px text-green text-[16px]">OOPS! NO DATA FOUND</h5>
    </div>
  );
};
export default Empty;
