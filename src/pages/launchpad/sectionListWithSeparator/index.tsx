import { useState, useEffect } from 'react';
import './index.scss';
export const AirDrop = () => {
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
    <div className="flex section">
      {airDrops.map((item: any) => {
        return (
          <div className="air-drop-item mr-2 flex overflow items-center px-[10px] py-[5px]" key={item.id}>
            <img className="w-10 mr-2" src="./temp/cow.png" alt="" />
            <span> {item.address}</span>
          </div>
        );
      })}
    </div>
  );
};
