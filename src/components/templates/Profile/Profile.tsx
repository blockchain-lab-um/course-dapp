import React, { useState, useEffect } from 'react';
import { VCList } from '../../modules/VCList/VCList';
import { MascaApi } from '@blockchain-lab-um/masca-types';
import { isError } from '@blockchain-lab-um/utils';
interface IConnectProps {
  mmAddress: string | null;
  api: MascaApi;
}

const snapId = process.env.SNAP_ID;
export const Profile: React.FC<IConnectProps> = ({ mmAddress, api }) => {
  const [VCs, setVCs] = useState<Array<any>>([]);
  useEffect(() => {
    console.log('Getting VCs...');
    if (!api) return;
    getVCs();
  }, []);

  const getVCs = async () => {
    try {
      const response = await api.queryVCs();
      if (isError(response)) {
        console.log(response);
        return;
      }
      setVCs(response.data);
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
