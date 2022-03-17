import React from 'react';
import { MMButton } from '../../elements/MMButton/MMButton';

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
      <div className="text-blue text-6xl font-bold m-2">Solidity Course</div>
      {!connected && <MMButton connMetaMask={connMetaMask} />}
      {connected && (
        <div className="text-brown text-2xl font-bold m-2 p-5 bg-blue">
          {address?.substring(0, 10) + '...'}
        </div>
      )}
    </div>
  );
};
