import SwipeCard from '@/components/SwipeCard';
import { IDO, IDOStatus } from './columns';
import { useState, useEffect } from 'react';
export const ActiveIdoCard = () => {
  const [idos, setIdos] = useState<IDO[]>([]);
  useEffect(() => {
    const idos = new Array(10).fill(undefined).map((item) => ({
      id: 'dogwifhat',
      name: 'DogWifHat',
      symbol: 'WIF',
      logo: '',
      date: '04 Sep 2024',
      totalRaised: 2.3,
      status: IDOStatus.active,
    }));
    setIdos(idos);
  }, []);

  return (
    <SwipeCard title="Active IDO" type="dark" step={180}>
      <div className="flex items-center overflow-hidden">
        {idos.map((ido) => (
          <div key={ido.id} className="flex flex-col w-[390px] px-11 py-6">
            <img src="" alt="" className="w-20 h-20 mb-1 rounded-full" />
            <p>{ido.name}</p>
            <img src="./SVG/icon-star.svg" className="w-7 h-7 my-4" />
            <div className="ido-info-item">
              <img src="./SVG/icon-circle.svg" alt="" className="w-5 h-5 mr-1" />
              <span className="mr-auto">Ticker</span>
              <span>{ido.symbol}</span>
            </div>
            <div className="ido-info-item">
              <img src="./SVG/icon-total-raised.svg" alt="" className="w-5 h-5 mr-1" />
              <span className="mr-auto">Total Raised</span>
              <span>{ido.symbol}</span>
            </div>
            <div className="ido-info-item">
              <img src="./SVG/icon-circle.svg" alt="" className="w-5 h-5 mr-1" />
              <span className="mr-auto">Ticker</span>
              <span>{ido.symbol}</span>
            </div>
          </div>
        ))}
      </div>
    </SwipeCard>
  );
};
