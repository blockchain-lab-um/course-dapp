import { toNumber } from 'lodash';
import React from 'react';
interface IConnectProps {
  switchView: (viewId: number) => void;
  hasVC: boolean;
  openSecretRoom: () => void;
}

export const Navbar: React.FC<IConnectProps> = ({
  switchView,
  hasVC,
  openSecretRoom,
}) => {
  const buttonHandler = (e: any) => {
    e.preventDefault();
    const id = e.target.name;
    switchView(toNumber(id));
  };

  return (
    <div className="w-full flex justify-start text-3xl pl-3 text-bold text-blue">
      <button
        className="p-3 font-bold hover:text-white hover:bg-blue"
        onClick={buttonHandler}
        name="0"
      >
        Course
      </button>
      <button
        className="p-3 font-bold hover:text-white hover:bg-blue"
        onClick={buttonHandler}
        name="1"
      >
        Profile
      </button>
      {hasVC && (
        <button
          className="p-3 font-bold hover:text-white hover:bg-blue"
          onClick={openSecretRoom}
        >
          Secret Room
        </button>
      )}
    </div>
  );
};
