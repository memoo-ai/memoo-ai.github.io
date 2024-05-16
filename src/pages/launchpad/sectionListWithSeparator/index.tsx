import { useState, useEffect } from 'react';
import './index.scss';
export const SectionListWithSeparator = () => {
  const [airDrops, setAirDrops] = useState<any>([]);
  useEffect(() => {
    const list = new Array(20).fill(undefined).map((_, i) => ({
      id: i,
      address: 'Rg7GG...kf9Lj7',
      desc: 'has participated in WIF airdrop',
    }));
    setAirDrops(list);
  }, []);

  return (
    <div className="flex sections">
      <div className="section-item flex column">
        <div>
          <img className="section-item-img" src="./launchPad/img-vector.png" alt="" />
          <p className="section-item-text">View Creator Ranking</p>
        </div>
        <div>
          <img className="section-item-img" src="./launchPad/img-vector.png" alt="" />
          <p className="section-item-text">View Creator Ranking</p>
        </div>
        <div>
          <img className="section-item-img" src="./launchPad/img-vector.png" alt="" />
          <p className="section-item-text">View Creator Ranking</p>
        </div>
      </div>
    </div>
  );
};
