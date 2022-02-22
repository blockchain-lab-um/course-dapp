import React from 'react';

interface IConnectProps {
  connMetaMask: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
}

export const Connect: React.FC<IConnectProps> = ({
  connMetaMask,
  sendMessage,
  verifyAccounts,
}) => {
  return (
    <div>
      <button onClick={connMetaMask}>Connect MetaMask</button>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={verifyAccounts}>Verify Accounts</button>
    </div>
  );
};
