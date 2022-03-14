import React from 'react';
import { Connect } from './Connect';

interface IConnectProps {
  installSnap: () => void;
  sendMessage: () => void;
  verifyAccounts: () => void;
  addKey: () => void;
  getVcs: () => void;
  getVp: () => void;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  installSnap,
  sendMessage,
  verifyAccounts,
  addKey,
  getVcs,
  getVp,
}) => {
  return (
    <div>
      <Connect
        installSnap={installSnap}
        sendMessage={sendMessage}
        verifyAccounts={verifyAccounts}
        addKey={addKey}
        getVcs={getVcs}
        getVp={getVp}
      />
    </div>
  );
};
