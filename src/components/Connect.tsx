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
      <button onClick={installSnap}>Install Snap</button>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={verifyAccounts}>Verify Accounts</button>
      <button onClick={addKey}>Add Key</button>
      <button onClick={getVcs}>Get VCs</button>
      <button onClick={getVp}>Get VP</button>
    </div>
  );
};
