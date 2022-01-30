import React from 'react';

interface IConnectProps {
  connMetaMask: () => void;
  connSporran: () => void;
  createDid: () => void;
  addr?: string;
}

export const Connect: React.FC<IConnectProps> = ({
  connMetaMask,
  connSporran,
  createDid,
  addr,
}) => {
  return (
    <div>
      <button onClick={connMetaMask}>Connect MetaMask</button>
      <button onClick={connSporran}>Connect Sporran</button>
      <h3>Address: {addr}</h3>
      <button onClick={createDid}>Test Did</button>
    </div>
  );
};
