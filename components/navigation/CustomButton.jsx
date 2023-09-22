import { ConnectButton } from '@rainbow-me/rainbowkit';
export const CustomButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet ▼
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network ▼
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center',     justifyContent: 'space-between', // this line right aligns the arrow
                    border: '1px solid #ced0d5', paddingLeft: '15px', paddingRight:'60px', paddingTop:'6px', paddingBottom:'6px', borderRadius: '2px', width: '225px'
                }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 25,
                          height: 25,
                          overflow: 'hidden',
                          borderRadius: '50%', // this line makes the image a circle
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 25, height: 25 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name} ▼
                  </button>
                  <button onClick={openAccountModal} type="button" style={{display: 'flex', alignItems: 'center',     justifyContent: 'space-between', // this line right aligns the arrow
                                    border: '1px solid #ced0d5', paddingLeft: '30px', paddingRight:'30px', maxHeight:'45px', borderRadius: '2px', width: '250px'}}>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance}) `
                      : ''}
                    ▼
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};