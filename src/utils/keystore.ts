//export const Kilt = require('@kiltprotocol/sdk-js');
import * as Kilt from '@kiltprotocol/sdk-js';

export async function keystoreGeneration() {
  const keystore = new Kilt.Did.DemoKeystore();

  return keystore;
}
