import React from 'react';

interface IConnectProps {
  startCourse: () => void;
}

export const StartCourseForm: React.FC<IConnectProps> = ({ startCourse }) => {
  return (
    <div className="w-3/5">
      <div className="grid justify-items-center bg-blue p-8">
        <div>
          <h3 className="text-3xl text-center text-white mb-10">
            Start the course to recieve your VC!
          </h3>
          <br />
          <br />
        </div>
      </div>
      <div className="flex justify-center m-[-65px]">
        <button
          className="py-5 px-5 m-2 text-blue text-3xl bg-white hover:outline-green hover:bg-blue hover:text-white outline outline-blue outline-8"
          onClick={startCourse}
        >
          start
        </button>
      </div>
    </div>
  );
};
