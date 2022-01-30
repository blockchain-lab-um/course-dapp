import React from 'react';
import { Connect } from './Connect';
import { ethers } from 'ethers';

interface IConnectProps {
  connMetaMask: () => void;
  connSporran: () => void;
  createDid: () => void;
  addr?: string;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  connMetaMask,
  connSporran,
  createDid,
  addr,
}) => {
  return (
    <div>
      <Connect
        connMetaMask={connMetaMask}
        connSporran={connSporran}
        createDid={createDid}
        addr={addr}
      />
    </div>
  );
};
