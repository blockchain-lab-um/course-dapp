import React from 'react';
import { VCCard } from '../../elements/VCCard/VCCard';
interface IConnectProps {
  VCs: Array<any>;
}

export const VCList: React.FC<IConnectProps> = ({ VCs }) => {
  return (
    <div className="w-full p-3 grid justify-center">
      {VCs.map((vc) => (
        <VCCard VC={vc} />
      ))}
    </div>
  );
};
