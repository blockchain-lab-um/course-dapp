import React, { useState, useEffect, useCallback } from 'react';
import { ConnectContainer } from './ConnectContainer';
import { Course } from './Course';
import { ethers } from 'ethers';
import { EthrDID } from 'ethr-did';
import { Resolver, DIDDocument } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import * as Kilt from '@kiltprotocol/sdk-js';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { apiWindow, getSession, Session } from '../utils/session';
import { createClaimerLightDid, resolveLightDid } from '../utils/claimersDid';
import { keystoreGeneration } from '../utils/keystore';
import { from_b58, MAP, toHexString } from '../utils/base58';

interface GlobalKilt {
  /** `extensionId` references the extension on the `GlobalKilt` object but is not used by the dApp */
  [extensionId: string]: InjectedWindowProvider;
}
interface InjectedWindowProvider {
  startSession: (
    /** human-readable name of the dApp */
    dAppName: string,

    /** ID of the key agreement key of the dApp DID to be used to encrypt the session messages */
    dAppEncryptionKeyId: string,

    /** 24 random bytes as hexadecimal */
    challenge: string
  ) => Promise<PubSubSession>;

  /** human-readable name of the extension */
  name: string;

  /** version of the extension */
  version: string;

  /** MUST equal the version of this specification the extension adheres to */
  specVersion: '1.0';
}

interface PubSubSession {
  /** Configure the callback the extension must use to send messages to the dApp. Overrides previous values. */
  listen: (callback: EncryptedMessageCallback) => Promise<void>;

  /** send the encrypted message to the extension */
  send: EncryptedMessageCallback;

  /** close the session and stop receiving further messages */
  close: () => Promise<void>;

  /** ID of the key agreement key of the temporary DID the extension will use to encrypt the session messages */
  encryptionKeyId: string;

  /** bytes as hexadecimal */
  encryptedChallenge: string;

  /** 24 bytes nonce as hexadecimal */
  nonce: string;
}

interface EncryptedMessageCallback {
  (message: EncryptedMessage): Promise<void>;
}

interface EncryptedMessage {
  /** DID key ID of the receiver */
  receiverKeyId: string;

  /** DID key ID of the sender */
  senderKeyId: string;

  /** ciphertext as hexadecimal */
  ciphertext: string;

  /** 24 bytes nonce as hexadecimal */
  nonce: string;
}
interface HasSporran {
  data?: {
    hasSporran: boolean;
  };
}

const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));

function useHasSporran(): HasSporran {
  const [hasSporran, setHasSporran] = useState<boolean>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Boolean(apiWindow.kilt.sporran)) {
        setHasSporran(true);
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      if (hasSporran === undefined) {
        setHasSporran(false);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeoutId);
    };
  }, [hasSporran]);

  return typeof hasSporran === 'boolean' ? { data: { hasSporran } } : {};
}

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [spEdKey, setSpEdKey] = useState<string>('');
  const [didEthrComplete, setDidEthrComplete] = useState<boolean | null>(null);
  const [addr, setAddr] = useState<string>('');
  const [sporranAcc, setSporranAcc] = useState<string>('');
  const [session, setSession] = useState<Session>();

  const { data } = useHasSporran();
  console.log(data);

  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: React.SetStateAction<string>[]) => {
          setAddr(result[0]);
          //Check for DID:ETHR KILT attr
        });
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  const createTempAttr = async (ethrDid: EthrDID) => {
    //???
    //const { kp, txHash } = await ethrDid.createSigningDelegate(); // Adds a signing delegate valid for 1 day

    //const didDocument = (await didResolver.resolve(ethrDid.did)).didDocument;
    //console.log(didDocument);

    //Set Kilt public key
    if (spEdKey !== '') {
      await ethrDid.setAttribute('did/pub/Ed25519/veriKey/base58', spEdKey);
    } else {
      console.log('Missing ed key');
    }
    return;
  };

  const resolveDidEthr = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const chainNameOrId = (await provider.getNetwork()).chainId;
    const ethrDid = new EthrDID({ identifier: addr, provider, chainNameOrId });
    const didDocument = (await didResolver.resolve(ethrDid.did)).didDocument;
    console.log('DID:ETHR DID DOCUMENT:', didDocument);
    return { ethrDid, didDocument };
  };

  function getWindowExtensions(): InjectedWindowProvider[] {
    return Object.values(window.kilt);
  }

  function Connect({ setSession }: { setSession: (s: Session) => void }) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<'closed' | 'rejected' | 'unknown'>();

    const handleConnectClick = useCallback(
      async (event) => {
        try {
          event.preventDefault();
          setProcessing(true);
          setError(undefined);

          setSession(await getSession());
        } catch (exception) {
          console.log('Exception', exception);
          setProcessing(false);
        }
      },
      [setSession]
    );

    return (
      <section>
        <div>
          {!error && <p>Please authorize access to your wallet.</p>}

          {error === 'closed'}

          {error === 'rejected'}

          {error === 'unknown'}

          {error === 'rejected' ? (
            <a
              href="https://support.kilt.io/support/solutions/articles/80000968082-how-to-grant-access-to-website"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </a>
          ) : (
            <button
              type="button"
              onClick={handleConnectClick}
              disabled={processing}
            >
              Connect to wallet
            </button>
          )}
        </div>

        {processing}
      </section>
    );
  }

  const connectSporran = async () => {
    //console.log('extension', getWindowExtensions());

    /*const extensions = await web3Enable("test");
    if (extensions.length === 0) {
      console.log("Sporran not installed");
      return;
    }
    const accounts = await web3Accounts();
    console.log(accounts);
    setSporranAcc(accounts[0].address);*/

    const { claimerLightDid, keystore: claimerKeystore } =
      await createClaimerLightDid(await keystoreGeneration(), '');
    console.log('Keystore:', claimerKeystore);
    console.log('DID:', claimerLightDid);
    setSporranAcc(claimerLightDid.did);
    const publicKeyHex = await resolveLightDid(claimerLightDid.did);
    if (publicKeyHex) {
      setSpEdKey(publicKeyHex);
    }
    return;
  };

  const checkForEdKey = async (didEthr: DIDDocument) => {
    //const didEthr = await resolveDidEthr();
    const veriKeys = didEthr?.verificationMethod;
    let retVal = false;
    if (veriKeys != null) {
      const edKeys = veriKeys.filter((key) => {
        return key.type == 'Ed25519VerificationKey2018';
      });
      console.log(edKeys);
      edKeys.map((key) => {
        if (key.publicKeyBase58) {
          const fb58 = from_b58(key.publicKeyBase58, MAP);
          if (fb58) {
            var decoded = toHexString(fb58);
            if (decoded == spEdKey.substring(2)) {
              retVal = true;
            }
          }
        } else if (key.publicKeyHex) {
          console.log('TODO hex:', key.publicKeyHex);
        }
      });
    }
    return retVal;
  };

  const verifyConnection = async () => {
    if (addr === '') {
      console.log('Connect MetaMask!');
      return;
    }
    if (sporranAcc === '' || spEdKey === '') {
      console.log('Create Light DID');
      return;
    }
    const { ethrDid, didDocument } = await resolveDidEthr();
    //Check if DID:ETHR has KILT Ed key
    if (didDocument != null) {
      const hasKey = await checkForEdKey(didDocument);
      console.log(hasKey);
      //If there is no key, create new attribute
      if (!hasKey) {
        createTempAttr(ethrDid);
      }
    }
  };

  return (
    <div>
      <ConnectContainer
        connMetaMask={connectMetamask}
        connSporran={connectSporran}
        addr={addr}
        sporranAddr={sporranAcc}
        verifyAccounts={verifyConnection}
      />
      <Connect setSession={setSession} />
      <Course />
    </div>
  );
};
