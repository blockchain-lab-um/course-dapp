import { IDidKeyDetails, IEncryptedMessage } from '@kiltprotocol/types';
import * as Kilt from '@kiltprotocol/sdk-js';

interface PubSubSession {
  listen: (
    callback: (message: IEncryptedMessage) => Promise<void>
  ) => Promise<void>;
  close: () => Promise<void>;
  send: (message: IEncryptedMessage) => Promise<void>;
  encryptionKeyId: IDidKeyDetails['id'];
  encryptedChallenge: string;
  nonce: string;
}

interface InjectedWindowProvider {
  startSession: (
    dAppName: string,
    dAppEncryptionKeyId: IDidKeyDetails['id'],
    challenge: string
  ) => Promise<PubSubSession>;
  name: string;
  version: string;
  specVersion: '0.1';
}

export const apiWindow = window as unknown as {
  kilt: { sporran?: InjectedWindowProvider };
};

export type Session = PubSubSession & {
  sessionId: string;
};

async function startExtensionSession(
  extension: InjectedWindowProvider,
  dAppName: string,
  dAppEncryptionKeyId: string,
  challenge: string
): Promise<PubSubSession> {
  try {
    const session = await extension.startSession(
      dAppName,
      dAppEncryptionKeyId,
      challenge
    );

    // Resolve the `session.encryptionKeyId` and use this key and the nonce
    // to decrypt `session.encryptedChallenge` and confirm that it’s equal to the original challenge.
    // This verification must happen on the server-side.

    return session;
  } catch (error) {
    console.error(`Error initializing ${extension.name}: ${error}`);
    throw error;
  }
}

export async function getSession(): Promise<Session> {
  const provider = apiWindow.kilt.sporran;
  if (!provider) {
    throw new Error('No provider');
  }
  const dAppName = 'CourseDapp';
  //24 random bytes as hexadecimal
  const challenge = '878e135e87d0103d6a197c491403f8b3ae00ddeb40737011';
  //Id of the key agreement key of the Dapp DID
  const dAppEncryptionKeyId =
    'did:kilt:4p3LFvzE85x5Dj9qWBSt4M389pbtVXZiUyw3LD6QfvPa6A6s#0xb7ea2f6c7a115bbbc88ed476db70cdd2dd079425217ec6d96c3582d200c0947b';
  const sessionId = '0xs';
  console.log('Starting session...', provider);

  const keystore = new Kilt.Did.DemoKeystore();
  const encryptionKeypair = await keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: 'stick vault tiger glow follow silver puppy another tunnel dragon spoon solve',
  });

  const authKeypair = await keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Ed25519,
    seed: 'stick vault tiger glow follow silver puppy another tunnel dragon spoon solve',
  });

  const claimerLightDid = new Kilt.Did.LightDidDetails({
    authenticationKey: {
      publicKey: authKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(authKeypair.alg),
    },
    encryptionKey: {
      publicKey: encryptionKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(encryptionKeypair.alg),
    },
  });

  console.log(claimerLightDid.getKeyIds()[1].toString());
  const session = await startExtensionSession(
    provider,
    dAppName,
    claimerLightDid.getKeyIds()[1].toString(),
    challenge
  );
  console.log('Started session.');

  return { ...session, sessionId };
}

//did:kilt:4p3LFvzE85x5Dj9qWBSt4M389pbtVXZiUyw3LD6QfvPa6A6s#0xab85bdd37f6d5d6ed0e45b7266fe94bc17fa4081a237952811e1981d1c07880c
//Mainnet
//kilt.sporran.startSession("test", 'did:kilt:4pbjiC19xKr7jcyZCRiT5NCBh1mx78ENsdFQvvKX9yuv4seM#0xed7dd93685109869e59ee1bd74cccfba774da55f3e88cdd60bb23b5df4a95aaf', '878e135e87d0103d6a197c491403f8b3ae00ddeb40737011')
//Testnet
//kilt.sporran.startSession("test", 'did:kilt:4p3LFvzE85x5Dj9qWBSt4M389pbtVXZiUyw3LD6QfvPa6A6s#0xab85bdd37f6d5d6ed0e45b7266fe94bc17fa4081a237952811e1981d1c07880c', '878e135e87d0103d6a197c491403f8b3ae00ddeb40737011')
