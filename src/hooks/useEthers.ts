import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useCallback, useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { type Config, useConnectorClient, useSignMessage, useAccount } from 'wagmi';

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  // eslint-disable-next-line no-debugger
  // debugger;
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export function useSign() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const signer = useEthersSigner({ chainId: Number(import.meta.env.VITE_NODE_CHAIN_ID) });

  const handleSign = useCallback(async () => {
    const msg = String(Date.now());
    const signature = await signMessageAsync({ message: msg });
    return { msg, signature };
  }, [address]);

  const getSign = useCallback(async () => {
    // eslint-disable-next-line no-debugger
    // debugger;
    console.log(signer);
    if (!signer) return;
    // const msg = String(Date.now() / 1e3);
    const msg = String(Date.now());
    const rawSignature = await signer.signMessage(msg);
    console.log('rawSignature:', rawSignature);
    return {
      rawSignature,
      msg,
    };
  }, [signer]);

  return { getSign, handleSign };
}
