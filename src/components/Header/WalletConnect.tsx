import { Button, DropdownMenu } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useAccount, useDisconnect } from 'wagmi';
import { handleCopy } from '@/utils';

const explorerURL = import.meta.env.VITE_EXPLORER_URL;

export default () => {
  const { address, isConnected } = useAccount();
  const { connectors, disconnect } = useDisconnect();
  const onDisconnect = async () => {
    if (isConnected || address) {
      for (const connector of connectors) {
        // maybe multi connectors. disconnct all.
        await disconnect({ connector });
      }
      await disconnect();
      console.log('=====================>disconnect');
    }
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="soft"
                    onClick={openConnectModal}
                    className="cursor-pointer hidden md:block text-center text-lg  md:h-[51px] px-6 md:bg-[#CC0000] md:text-[#FFFFFF] font-bold font-Montserrat"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="soft" onClick={openChainModal}>
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </Button>
                );
              }

              return (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <div>
                      <Button variant="soft" onClick={openAccountModal} className="text-[#fff]">
                        {account.address.slice(0, 6)}...{account.address.slice(-4)}
                        {/* {account.displayName} */}
                        <CaretDownIcon />
                      </Button>
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item color="red" onClick={() => handleCopy(account.address)}>
                      Copy
                    </DropdownMenu.Item>
                    <DropdownMenu.Item color="red">Profile</DropdownMenu.Item>
                    <DropdownMenu.Item color="red">Watchlist</DropdownMenu.Item>
                    <DropdownMenu.Item color="red" onClick={onDisconnect}>
                      Disconnect
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
