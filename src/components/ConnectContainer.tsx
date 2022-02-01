import React from "react";
import { Connect } from "./Connect";
import { ethers } from "ethers";

interface IConnectProps {
  connMetaMask: () => void;
  connSporran: () => void;
  createDid: () => void;
  verifyAccounts: () => void;
  addr?: string;
  sporranAddr?: string;
}

export const ConnectContainer: React.FC<IConnectProps> = ({
  connMetaMask,
  connSporran,
  createDid,
  verifyAccounts,
  addr,
  sporranAddr,
}) => {
  return (
    <div>
      <Connect
        connMetaMask={connMetaMask}
        connSporran={connSporran}
        createDid={createDid}
        addr={addr}
        sporranAddr={sporranAddr}
        verifyAccounts={verifyAccounts}
      />
    </div>
  );
};
