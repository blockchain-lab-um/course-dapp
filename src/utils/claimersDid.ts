//const Kilt = require('@kiltprotocol/sdk-js');
import * as Kilt from '@kiltprotocol/sdk-js';
import {
  IDidResolvedDetails,
  KeyRelationship,
  IDidPublicKeyDetails,
  IDidKeyDetails,
} from '@kiltprotocol/sdk-js';

export async function createClaimerLightDid(
  keystore: any,
  claimerMnemonic: any
) {
  // replace with the claimer mnemonic
  claimerMnemonic =
    'gold upset segment cake universe carry demand comfort dawn invite element capital';

  const claimerSigningKeypair = await keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Ed25519,
    seed: claimerMnemonic,
  });
  const claimerEncryptionKeypair = await keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: claimerMnemonic,
  });

  const claimerLightDid = new Kilt.Did.LightDidDetails({
    authenticationKey: {
      publicKey: claimerSigningKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(
        claimerSigningKeypair.alg
      ),
    },
    encryptionKey: {
      publicKey: claimerEncryptionKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(
        claimerEncryptionKeypair.alg
      ),
    },
  });

  console.log('Claimers Light DID:', claimerLightDid);

  return { claimerLightDid, keystore };
}

export const resolveLightDid = async (identifier: string) => {
  await Kilt.init({ address: 'wss://peregrine.kilt.io/parachain-public-ws' });
  const resolved = (await Kilt.Did.DefaultResolver.resolve(
    identifier
  )) as IDidResolvedDetails;
  const authKey = resolved.details?.getKeys(KeyRelationship.authentication);
  if (!authKey) {
    console.log('Key undefined');
    Kilt.disconnect();
    return;
  }
  console.log('Auth key:', authKey[0]);
  if (authKey[0].type === 'ed25519') {
    console.log('ED KEY:', authKey[0].publicKeyHex);
    return authKey[0].publicKeyHex;
  }
  Kilt.disconnect();
  return;
};
