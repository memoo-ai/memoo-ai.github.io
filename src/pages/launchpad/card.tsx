import SwipeCard from '@/components/SwipeCard';
import { IDO, IDOStatus } from './columns';
import { useState, useEffect } from 'react';
import './card.scss';
import { Button } from '@/components/ui/button';
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
      target: 3,
      status: IDOStatus.active,
      roi: 20.2,
    }));
    setIdos(idos);
  }, []);

  return (
    <SwipeCard title="Active IDO" step={360}>
      <div className="flex items-center overflow-hidden">
        {idos.map((ido) => (
          <div key={ido.id} className="flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg">
            <img src="" alt="" className="w-20 h-20 mb-2 rounded-full" />
            <p className="font-OCR text-white text-lg mb-[64px]">{ido.name}</p>
            <div className="ido-info-item">
              <img src="./dashboard/icon-roi.svg" alt="" className="w-5 h-5 mr-1" />
              <span>Ticker</span>
              <span>{ido.symbol}</span>
            </div>

            <div className="ido-info-item">
              <img src="./dashboard/icon-ido-symbol.svg" alt="" className="w-5 h-5 mr-1" />
              <span>Ticker</span>
              <span>{ido.symbol}</span>
            </div>
            <div className="ido-info-item">
              <img src="./dashboard/icon-raised-target.svg" alt="" className="w-5 h-5 mr-1" />
              <span>Total Raised</span>
              <span>
                {ido.symbol}/{ido.target} ETH
              </span>
            </div>
            <Button variant="secondary" className="font-404px text-lg  w-full h-[50px] uppercase mt-[74px]">
              Hunt for airdrops
            </Button>
          </div>
        ))}
      </div>
    </SwipeCard>
  );
};
