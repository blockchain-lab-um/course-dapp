import React from 'react';

export const Footer: React.FC = ({}) => {
  return (
    <footer className="p-3 bg-blue text-white">
      <div className="w-full mx-auto">
        <div className="">
          <div className=" flex justify-center text-center text-sm text-white">
            <a
              href="https://blockchain-lab.um.si/"
              className="mx-6 hover:text-green"
            >
              Blockchain Lab:UM
            </a>
            <a
              href="https://github.com/blockchain-lab-um"
              className="mx-6 hover:text-green"
            >
              Github
            </a>
            <span className="mx-5">
              Mail:
              <a
                href="mailto:blockchain-lab@um.si"
                className="mx-1 hover:text-green"
              >
                blockchain-lab@um.si
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
