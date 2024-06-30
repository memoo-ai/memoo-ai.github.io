/* eslint-disable no-debugger */
import { ZERO } from '@/constants';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import * as SPLToken from '@solana/spl-token';
import { ParsedAccountData, PublicKey } from '@solana/web3.js';

type Mint = PublicKey;
type ProgramId = PublicKey;

const useSPLToken = (pk: ProgramId | Mint) => {
  const [balance, setBalance] = useState<BigNumber>();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [decimals, setDecimals] = useState(0);

  useEffect(() => {
    if (!connection || !publicKey) return;

    (async () => {
      const tokenInfo = await connection.getParsedAccountInfo(pk);
      const decimals = (tokenInfo.value?.data as ParsedAccountData).parsed.info.decimals as number;
      setDecimals(decimals);

      const myTokens = await connection.getTokenAccountsByOwner(publicKey, { mint: pk }, 'confirmed');
      const token = myTokens.value?.[0];
      // console.log(`pubkey: ${token.pubkey.toBase58()}`);

      const accountInfo = SPLToken.AccountLayout.decode(token.account.data);
      // console.log(`mint: ${new PublicKey(accountInfo.mint)}`);
      // console.log(`amount: ${accountInfo.amount}`);

      setBalance(new BigNumber(accountInfo.amount).dividedBy(10 ** decimals));
    })();
  }, [publicKey, connection, decimals]);

  return { balance, decimals };
};

export default useSPLToken;
