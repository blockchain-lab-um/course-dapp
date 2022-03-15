import React from 'react';

interface IConnectProps {}

export const GetVC: React.FC<IConnectProps> = ({}) => {
  return (
    <div className="grid justify-items-center">
      <h1>You have successfuly completed the course! </h1>
      <h2>VC should appear in your wallet shortly!</h2>
    </div>
  );
};
