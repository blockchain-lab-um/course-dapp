import React from 'react';

interface IConnectProps {
  addAttribute: () => void;
}

export const AddAttributeForm: React.FC<IConnectProps> = ({ addAttribute }) => {
  return (
    <div className="w-3/5">
      <div className="grid justify-items-center bg-blue p-8">
        <div>
          <h3 className="text-3xl text-center text-green mb-10">
            To ensure everything is working smoothly, additional DID delegate is
            required. To add delegate, add a custom attribute to your MetaMask
            account DID!
          </h3>
          <br />
          <br />
        </div>
      </div>
      <div className="flex justify-center m-[-65px]">
        <button
          className="py-5 px-5 m-2 text-white text-3xl bg-blue hover:text-lightgreen outline outline-green outline-8"
          onClick={addAttribute}
        >
          add attribute
        </button>
      </div>
    </div>
  );
};
