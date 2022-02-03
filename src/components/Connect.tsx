import React from 'react';

interface IConnectProps {
  connMetaMask: () => void;
  connSporran: () => void;
  verifyAccounts: () => void;
  addr?: string;
  sporranAddr?: string;
}

export const Connect: React.FC<IConnectProps> = ({
  connMetaMask,
  connSporran,
  verifyAccounts,
  addr,
  sporranAddr,
}) => {
  return (
    <div>
      <button onClick={connMetaMask}>Connect MetaMask</button>
      <button onClick={connSporran}>Connect Sporran</button>
      <h3>Metamask Address: {addr}</h3>
      <h3>KILT Light DID: {sporranAddr}</h3>
      <button onClick={verifyAccounts}>Verify Accounts</button>
    </div>
  );
};
