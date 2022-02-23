import React, { useState } from 'react';

interface IConnectProps {
  completeCourse: () => void;
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
      completeCourse();
    }
    console.log('Name', name, radioState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Do you know how to program?
          <div>
            <input
              type="radio"
              value="true"
              name="canProgram"
              onChange={handleRadioBtnChange}
            />{' '}
            Yes
            <input
              type="radio"
              value="false"
              name="canProgram"
              onChange={handleRadioBtnChange}
              defaultChecked
            />{' '}
            No
          </div>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
};
