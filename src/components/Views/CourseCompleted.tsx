import React from 'react';

interface IConnectProps {}

export const CourseCompleted: React.FC<IConnectProps> = ({}) => {
  return (
    <div className="grid justify-items-center text-blue text-3xl font-semibold">
      <h1>You have successfuly completed the course! </h1>
      <h2>VC should appear in your wallet shortly!</h2>
    </div>
  );
};
