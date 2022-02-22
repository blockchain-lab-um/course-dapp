import React from 'react';
import { Connect } from './Connect';

interface IConnectProps {
  connMetaMask: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  connMetaMask,
  sendMessage,
  verifyAccounts,
}) => {
  return (
    <div>
      <Connect
        connMetaMask={connMetaMask}
        sendMessage={sendMessage}
        verifyAccounts={verifyAccounts}
      />
    </div>
  );
};
