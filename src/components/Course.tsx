import React from 'react';
import { Form } from './Form/Form';

interface IConnectProps {
  completeCourse: (name: string) => void;
}

export const Course: React.FC<IConnectProps> = ({ completeCourse }) => {
  return (
    <div>
      <h1>Welcome To course</h1>
      <Form completeCourse={completeCourse} />
    </div>
  );
};
