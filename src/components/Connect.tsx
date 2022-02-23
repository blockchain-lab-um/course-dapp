import React from 'react';

interface IConnectProps {
  installSnap: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
}

export const Connect: React.FC<IConnectProps> = ({
  installSnap,
  sendMessage,
  verifyAccounts,
}) => {
  return (
    <div>
      <button onClick={installSnap}>Install Snap</button>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={verifyAccounts}>Verify Accounts</button>
    </div>
  );
};
