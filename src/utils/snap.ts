import {
  SSISnapApi,
  SaveVC,
  GetVCs,
  GetVP,
  TogglePopups,
  ChangeInfuraToken,
  MetaMaskSSISnapRPCRequest,
  VCQuerry,
} from '@blockchain-lab-um/ssi-snap-types';

import { VerifiableCredential, VerifiablePresentation } from '@veramo/core';

async function sendSnapMethod<T>(
  request: MetaMaskSSISnapRPCRequest,
  snapId: string
): Promise<T> {
  console.log('REquest:', request);
  return await window.ethereum.request({
    method: snapId,
    params: [request],
  });
}

export async function getVCs(
  this: MetaMaskSSISnap,
  querry?: VCQuerry
): Promise<VerifiableCredential[]> {
  return await sendSnapMethod(
    { method: 'getVCs', params: { querry: querry } },
    this.snapId
  );
}

export async function getVP(
  this: MetaMaskSSISnap,
  vc_id: string,
  challenge?: string,
  domain?: string
): Promise<VerifiablePresentation> {
  return await sendSnapMethod(
    {
      method: 'getVP',
      params: { vc_id: vc_id, challenge: challenge, domain: domain },
    },
    this.snapId
  );
}

export async function saveVC(
  this: MetaMaskSSISnap,
  verifiableCredential: VerifiableCredential
): Promise<boolean> {
  return await sendSnapMethod(
    {
      method: 'saveVC',
      params: { verifiableCredential: verifiableCredential },
    },
    this.snapId
  );
}

export async function togglePopups(this: MetaMaskSSISnap): Promise<boolean> {
  return await sendSnapMethod({ method: 'togglePopups' }, this.snapId);
}

export async function changeInfuraToken(
  this: MetaMaskSSISnap,
  infuraToken: string
): Promise<boolean> {
  return await sendSnapMethod(
    { method: 'changeInfuraToken', params: { infuraToken: infuraToken } },
    this.snapId
  );
}

export class MetaMaskSSISnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getSSISnapApi = async (): Promise<SSISnapApi> => {
    return {
      saveVC: saveVC.bind(this),
      getVCs: getVCs.bind(this),
      getVP: getVP.bind(this),
      togglePopups: togglePopups.bind(this),
      changeInfuraToken: changeInfuraToken.bind(this),
    };
  };
}
