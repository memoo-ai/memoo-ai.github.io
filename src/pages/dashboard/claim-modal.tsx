import { useState, Children, cloneElement, isValidElement, useEffect, useCallback } from 'react';

import './claim-modal.scss';
import { Modal, Button, message } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
import { getTokenDetail } from '@/api/token';
import BigNumber from 'bignumber.js';
import {
  Address,
  IDOActiveDetail,
  IDOLaunchedDetail,
  IDOLaunchedDetailTop10,
  IDOQueueDetail,
  TokenCreateStage,
  UnlockPeriod,
} from '@/types';
import { useManageContract } from '@/hooks/useManageContract';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { getIDOActiveDetail, getIDOLaunchedDetail, getIDOLaunchedDetailTop10, getIDOQueueDetail } from '@/api/airdrop';
import { compareAddrs, formatDecimals, formatNumberDecimal } from '@/utils';

const ClaimModal = ({ ticker, children }: any) => {
  const { config, idoBuy, unlockMeme, defaultConfig, airdropClaim, getCanUnlockCount, memeUnlockPeriods } =
    useManageContract();
  const [stage, setStage] = useState<TokenCreateStage>('in-queue');
  const [idoActiveDetail, setIDOActiveDetail] = useState<IDOActiveDetail>();
  const [idoLaunchedDetail, setIDOLaunchedDetail] = useState<IDOLaunchedDetail>();
  const [idoLaunchedDetailTop10, setIDOLaunchedDetailTop10] = useState<IDOLaunchedDetailTop10[]>([]);
  const [idoQueueDetail, setIDOQueueDetail] = useState<IDOQueueDetail>();
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_1stStage, set1stStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  const [_2ndStage, set2ndStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // For testin: BigEgg or NewCake
        const { data } = await getIDOQueueDetail(ticker);
        setIDOQueueDetail(data);

        if (data.stageTwoClaim) {
          setStage('2st-claim');
        } else if (data.stageOneClaim) {
          setStage('1st-claim');
        } else if (data.status === 'Launched') {
          const [p1, p2] = await Promise.all([
            getIDOLaunchedDetail(ticker),
            getIDOLaunchedDetailTop10({ pageNumber: 1, pageSize: 10, ticker: ticker }),
          ]);
          setIDOLaunchedDetail(p1.data);
          setIDOLaunchedDetailTop10(p2.data);
          setStage('launch');
        } else if (data.status === 'IDO') {
          const { data } = await getIDOActiveDetail(ticker);
          setIDOActiveDetail(data);
          setStage('imo');
        } else {
          setStage('in-queue');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (!idoQueueDetail || !address) return;
    (async () => {
      // 1st stage
      {
        const [unlockCount, unlockInfo] = await Promise.all([
          getCanUnlockCount(idoQueueDetail.contractAddress, address, 0) as Promise<BigNumber>,
          memeUnlockPeriods(0) as Promise<UnlockPeriod>,
        ]);
        console.log('1st stage', unlockCount, unlockInfo);
        set1stStage({ unlockCount, unlockInfo });
      }

      // 2nd stafe
      {
        const [unlockCount, unlockInfo] = await Promise.all([
          getCanUnlockCount(idoQueueDetail.contractAddress, address, 1) as Promise<BigNumber>,
          memeUnlockPeriods(1) as Promise<UnlockPeriod>,
        ]);
        console.log('2nd stage', unlockCount, unlockInfo);
        set2ndStage({ unlockCount, unlockInfo });
      }
    })();
  }, [idoQueueDetail, address, memeUnlockPeriods]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTokenDetail(ticker);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [ticker]);

  const onConfirm = useCallback(async () => {
    if (!unlockMeme || !idoQueueDetail) return;
    try {
      setConfirming(true);
      await unlockMeme(idoQueueDetail.contractAddress, stage === '1st-claim' ? 0 : 1);
      setOpen(false);
      message.success('Unlock Successful');
    } catch (error) {
      console.error(error);
      message.error('Unlock Failed');
    } finally {
      setConfirming(false);
    }
  }, [unlockMeme, idoQueueDetail]);

  return (
    <div>
      <Modal
        title=""
        open={open}
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
        width={604}
        destroyOnClose
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="confirm_title">Claim Tokens</div>
        {idoQueueDetail?.stageOneClaim && (
          <div className="flex justify-between mt-[39px] items-center">
            <div className="unlocked">
              <span>Redeem 1st 50% unlocked tokens</span> <img src="./dashboard/reward.svg" alt="" />
            </div>
            <div className="flex">
              <div className="unlock">
                <h3>14 days</h3>
                <p>Next Unlock</p>
              </div>
              <IconLock className="lock" />
            </div>
          </div>
        )}
        {idoQueueDetail?.stageTwoClaim && (
          <div className="flex justify-between mt-[39px] items-center">
            <div className="unlocked">
              <span>Redeem 2nd 50% unlocked tokens</span> <img src="./dashboard/reward.svg" alt="" />
            </div>
            <div className="flex">
              <div className="unlock">
                <h3>{parseFloat(formatDecimals(Number(_1stStage?.unlockInfo?.value ?? 0)))}</h3>
                <p>Claim Completed</p>
              </div>
              <IconCompleted className="lock" />
            </div>
          </div>
        )}
        <div className="claimable">
          <div className="claimable_left">Claimable LEASH</div>
          <div className="claimable_right">
            {Number(
              parseFloat(
                formatDecimals(
                  new BigNumber(_1stStage?.unlockCount ?? 0).dividedBy(10 ** (defaultConfig?.defaultDecimals ?? 0)),
                ),
              ),
            ).toLocaleString()}
          </div>
        </div>
        <div className="confirm_btn">
          <Button className="mt-[76px]" loading={confirming} onClick={onConfirm}>
            CLAIM ALL
          </Button>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </div>
  );
};
export default ClaimModal;
