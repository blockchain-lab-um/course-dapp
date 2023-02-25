import React from 'react';
import { VCCard } from '../../elements/VCCard/VCCard';
interface IConnectProps {
  VCs: Array<any>;
}

export const VCList: React.FC<IConnectProps> = ({ VCs }) => {
  return (
    <div className="w-full p-3 flex justify-center">
      {VCs.map((vc, id) => (
        <VCCard VC={vc.data} key={id} />
      ))}
    </div>
  );
};
