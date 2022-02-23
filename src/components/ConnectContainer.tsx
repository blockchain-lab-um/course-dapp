import React from 'react';
import { Connect } from './Connect';

interface IConnectProps {
  installSnap: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  installSnap,
  sendMessage,
  verifyAccounts,
}) => {
  return (
    <div>
      <Connect
        installSnap={installSnap}
        sendMessage={sendMessage}
        verifyAccounts={verifyAccounts}
      />
    </div>
  );
};
