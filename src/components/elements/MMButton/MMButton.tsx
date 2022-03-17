import React from 'react';

interface IConnectProps {
  connMetaMask: () => void;
}

export const MMButton: React.FC<IConnectProps> = ({ connMetaMask }) => {
  return (
    <div>
      <button
        className="py-3 px-3 m-4 text-white text-3xl bg-blue hover:outline-blue hover:text-blue hover:bg-white outline outline-blue outline-8"
        onClick={connMetaMask}
      >
        connect MetaMask
      </button>
    </div>
  );
};
