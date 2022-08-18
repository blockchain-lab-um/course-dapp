import React, { useState, useEffect } from 'react';
import { Response } from '../../../utils/interfaces';
import { VCList } from '../../modules/VCList/VCList';
interface IConnectProps {}

export const SecretRoom: React.FC<IConnectProps> = ({}) => {
  return (
    <div className="w-full">
      <div className="flex justify-center text-2xl font-bold mt-10">
        <div className="w-3/5">
          <div className="grid justify-items-center bg-blue p-8">
            <div>
              <h3 className="text-3xl text-center text-white mb-10">
                Congratulations! You`&apos;`ve discovered a secret room only
                accessible with a valid VC!
              </h3>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
