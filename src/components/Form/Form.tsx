import React, { useState } from 'react';

interface IConnectProps {
  completeCourse: (name: string) => void;
}

export const Form: React.FC<IConnectProps> = ({ completeCourse }) => {
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
    <div className="div-card">
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="ml-2 pl-2"
            />
          </label>
        </div>
        <div className="p-2">
          <label>
            Are you familiar with Solidity?
            <div>
              <input
                type="radio"
                value="true"
                name="canProgram"
                onChange={handleRadioBtnChange}
                className="mr-2"
              />{' '}
              Yes
              <input
                type="radio"
                value="false"
                name="canProgram"
                onChange={handleRadioBtnChange}
                className="ml-4"
                defaultChecked
              />{' '}
              No
            </div>
          </label>
        </div>
        <input className="custom-button-sm" type="submit" value="Submit" />
      </form>
    </div>
  );
};
