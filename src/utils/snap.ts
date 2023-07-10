import { Masca, enableMasca } from '@blockchain-lab-um/masca-connector';
import { isError } from '@blockchain-lab-um/utils';

export const defaultSnapId = 'local:http://localhost:8081';

let isInstalled: boolean = false;

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: Masca;
}

export async function initiateSSISnap(
  address: string,
  snapId: string
): Promise<SnapInitializationResponse> {
  try {
    console.log('Attempting to connect to snap...');
    console.log('Snap ID: ', snapId);
    console.log('Address: ', address);

    const enableResult = await enableMasca(address, {
      snapId,
    });

    if (isError(enableResult)) {
      console.log('Error');
      console.error(enableResult.error);
      return { isSnapInstalled: false };
    }

    isInstalled = true;
    console.log('Snap installed!');
    return { isSnapInstalled: true, snap: enableResult.data };
  } catch (e) {
    console.error(e);
    isInstalled = false;
    return { isSnapInstalled: false };
  }
}

export async function isSSISnapInstalled(): Promise<boolean> {
  return isInstalled;
}
