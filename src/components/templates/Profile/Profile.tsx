import React, { useState, useEffect } from 'react';
import { Response } from '../../../utils/interfaces';
import { VCList } from '../../modules/VCList/VCList';
interface IConnectProps {
  mmAddress: string | null;
}

// const snapId = 'local:http://localhost:8081/';
const snapId = 'npm:@blockchain-lab-um/ssi-snap';
export const Profile: React.FC<IConnectProps> = ({ mmAddress }) => {
  const [VCs, setVCs] = useState<Array<any>>([]);
  useEffect(() => {
    console.log('Getting VCs...');
    getVCs();
  }, []);

  const getVCs = async () => {
    try {
      const response = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'getVCs',
            params: [mmAddress],
          },
        ],
      })) as Response;
      console.log(response);
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
