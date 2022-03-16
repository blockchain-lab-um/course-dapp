import React from 'react';
import { CourseForm } from './Forms/CourseForm';

interface IConnectProps {
  completeCourse: (name: string) => void;
}

export const Course: React.FC<IConnectProps> = ({ completeCourse }) => {
  return (
    <div className="grid justify-items-center w-3/5 bg-blue">
      <h1 className="text-2xl font-bold mb-5">Ethereum Developer Course</h1>
      <CourseForm completeCourse={completeCourse} />
    </div>
  );
};
