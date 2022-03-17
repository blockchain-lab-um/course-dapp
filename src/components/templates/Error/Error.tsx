import React from 'react';

interface IConnectProps {
  msg?: string;
}

export const Error: React.FC<IConnectProps> = ({ msg }) => {
  return (
    <div className="grid justify-items-center text-white bg-blue p-10 text-3xl font-semibold">
      <h1>{msg}</h1>
    </div>
  );
};
