import React from 'react';

interface IConnectProps {
  installSnap: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
  addKey: () => void;
  getVcs: () => void;
  getVp: () => void;
}

export const Connect: React.FC<IConnectProps> = ({
  installSnap,
  sendMessage,
  verifyAccounts,
  addKey,
  getVcs,
  getVp,
}) => {
  return (
    <div>
      <button onClick={verifyAccounts}>Verify Accounts</button>
      <button onClick={getVcs}>Get VCs</button>
      <button onClick={getVp}>Get VP</button>
    </div>
  );
};
