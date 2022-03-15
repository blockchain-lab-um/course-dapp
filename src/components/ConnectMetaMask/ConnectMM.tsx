import React from 'react';

interface IConnectProps {
  connMetaMask: () => void;
}

export const ConnectMM: React.FC<IConnectProps> = ({ connMetaMask }) => {
  return (
    <div>
      <button className="custom-button" onClick={connMetaMask}>
        Connect MetaMask
      </button>
    </div>
  );
};
