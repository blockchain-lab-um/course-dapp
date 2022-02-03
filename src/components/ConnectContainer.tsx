import React from 'react';
import { Connect } from './Connect';
import { ethers } from 'ethers';

interface IConnectProps {
  connMetaMask: () => void;
  connSporran: () => void;
  verifyAccounts: () => void;
  addr?: string;
  sporranAddr?: string;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  connMetaMask,
  connSporran,
  verifyAccounts,
  addr,
  sporranAddr,
}) => {
  return (
    <div>
      <Connect
        connMetaMask={connMetaMask}
        connSporran={connSporran}
        addr={addr}
        sporranAddr={sporranAddr}
        verifyAccounts={verifyAccounts}
      />
    </div>
  );
};
