import React, { useState, useEffect } from 'react';
import { Response } from '../../../utils/interfaces';
import { VCList } from '../../modules/VCList/VCList';
import { SSISnapApi } from '@blockchain-lab-um/ssi-snap-types';
interface IConnectProps {
  mmAddress: string | null;
  api: SSISnapApi;
}

const snapId = process.env.SNAP_ID;
export const Profile: React.FC<IConnectProps> = ({ mmAddress, api }) => {
  const [VCs, setVCs] = useState<Array<any>>([]);
  useEffect(() => {
    console.log('Getting VCs...');
    getVCs();
  }, []);

  const getVCs = async () => {
    try {
      const response = await api.getVCs({});
      console.log(response);
      setVCs(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center text-2xl font-bold">
        <h1>My VCs</h1>
      </div>
      <VCList VCs={VCs} />
    </div>
  );
};
