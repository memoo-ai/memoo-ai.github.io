import SwipeCard from '@/components/SwipeCard';
import { useState, useEffect } from 'react';
import './card.scss';
import { Button } from '@/components/ui/button';
import { getImoCompleted } from '@/api/launchpad';
import { useNavigate } from 'react-router-dom';
import { LaunchpadIDOCompeted } from '@/types';

export const ActiveIdoCard = () => {
  const [idos, setIdos] = useState<LaunchpadIDOCompeted[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getImoCompleted({
          pageNumber: 1,
          pageSize: 10,
        });
        setIdos(data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <SwipeCard title="COMPLETED IMO" step={360}>
      <div className="flex items-center overflow-hidden">
        {idos.map((ido) => (
          <div key={ido.ticker} className="flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg">
            <img src={ido.icon} alt="" className="w-20 h-20 mb-2 rounded-full" />
            <p className="font-OCR text-white text-lg mb-[64px]">{ido.tokenName}</p>
            <div className="ido-info-item">
              <img src="./dashboard/icon-roi.svg" alt="" className="w-5 h-5 mr-1" />
              <span>ATH ROI</span>
              <span>{ido.athRoi}</span>
            </div>

            <div className="ido-info-item">
              <img src="./dashboard/icon-ido-symbol.svg" alt="" className="w-5 h-5 mr-1" />
              <span>Ticker</span>
              <span>{ido.ticker}</span>
            </div>
            <div className="ido-info-item">
              <img src="./dashboard/icon-raised-target.svg" alt="" className="w-5 h-5 mr-1" />
              <span>Total Raised</span>
              <span>{ido.totalRaised} ETH</span>
            </div>
            <Button
              variant="secondary"
              className="font-404px text-lg  w-full h-[50px] uppercase mt-[74px]"
              onClick={() => {
                navigate(`/airdrop/${ido.ticker}`);
              }}
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
    </SwipeCard>
  );
};
