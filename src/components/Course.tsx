import React from 'react';
import { Form } from './Form/Form';

interface IConnectProps {
  completeCourse: (name: string) => void;
}

export const Course: React.FC<IConnectProps> = ({ completeCourse }) => {
  return (
    <div className="grid justify-items-center">
      <h1 className="text-2xl font-bold mb-5">Ethereum Developer Course</h1>
      <Form completeCourse={completeCourse} />
    </div>
  );
};
