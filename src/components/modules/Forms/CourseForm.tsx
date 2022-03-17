import React, { useState } from 'react';

interface IConnectProps {
  completeCourse: (name: string) => void;
}

export const CourseForm: React.FC<IConnectProps> = ({ completeCourse }) => {
  const [name, setName] = useState('');
  const [radioState, setRadioState] = useState(false);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleRadioBtnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRadioState(e.currentTarget.value === 'true');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name == '' || radioState === false) {
      console.log('Fill form first');
    } else {
      completeCourse(name);
    }
    console.log('Name', name, radioState);
  };

  return (
    <div className="flex justify-center w-2/5 bg-blue text-white p-5 pt-10">
      <form onSubmit={handleSubmit}>
        <div className="text-4xl font-semibold">
          <label>
            NAME
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="ml-2 pl-2 text-blue outline-none bg-white w-2/3"
            />
          </label>
        </div>
        <br />
        <div className="p-2 text-2xl">
          <label>
            Are you familiar with Solidity?
            <div className="pt-1">
              <input
                type="radio"
                value="true"
                name="canProgram"
                onChange={handleRadioBtnChange}
                className="form-radio mr-2 text-green bg-white"
              />{' '}
              Yes
              <input
                type="radio"
                value="false"
                name="canProgram"
                onChange={handleRadioBtnChange}
                className="form-radio ml-4 text-green bg-white"
                defaultChecked
              />{' '}
              No
            </div>
          </label>
        </div>
        <br />
        <br />
        <br />
        <div className="w-full flex justify-center">
          <input
            className="absolute mt-[-20px] py-2 px-5 m-2 text-blue text-3xl bg-white hover:outline-green hover:bg-blue hover:text-white outline outline-blue outline-8"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};
