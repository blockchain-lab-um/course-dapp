import React from 'react';
import { ConnectMM } from '../ConnectMetaMask/ConnectMM';

interface IConnectProps {
  connected: boolean;
  address: string | null;
  connMetaMask: () => void;
}

export const Header: React.FC<IConnectProps> = ({
  connected,
  address,
  connMetaMask,
}) => {
  return (
    <div className="flex justify-between p-3">
      <div className="text-white text-6xl font-extrabold m-2">
        Solidity Course
      </div>
      {!connected && <ConnectMM connMetaMask={connMetaMask} />}
      {connected && (
        <div className="text-lightgreen text-2xl font-bold m-2 p-5 bg-blue">
          {address?.substring(0, 10) + '...'}
        </div>
      )}
    </div>
  );
};
