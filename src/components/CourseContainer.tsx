import React, { useState, useEffect } from "react";
import { ConnectContainer } from "./ConnectContainer";
import { Course } from "./Course";
import { ethers } from "ethers";
import { EthrDID } from "ethr-did";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import * as Kilt from "@kiltprotocol/sdk-js";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

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
  specVersion: "1.0";
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

const rpcUrl = "https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b";
const didResolver = new Resolver(getResolver({ rpcUrl, name: "rinkeby" }));

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [spAddress, setSpAddress] = useState<string | null>(null);
  const [didEthrComplete, setDidEthrComplete] = useState<boolean | null>(null);
  const [addr, setAddr] = useState<string>("");
  const [sporranAcc, setSporranAcc] = useState<string>("");

  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: React.SetStateAction<string>[]) => {
          setAddr(result[0]);
          //Check for DID:ETHR KILT attr
        });
    } else {
      console.log("Install Metamask");
    }
    return;
  };

  const createTempAttr = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const chainNameOrId = (await provider.getNetwork()).chainId;
    console.log(chainNameOrId);
    const ethrDid = new EthrDID({ identifier: addr, provider, chainNameOrId });

    //???
    //const { kp, txHash } = await ethrDid.createSigningDelegate(); // Adds a signing delegate valid for 1 day

    const didDocument = (await didResolver.resolve(ethrDid.did)).didDocument;
    console.log(didDocument);
    //Check for Kilt DID reference

    //Get KILT ED25519 public key

    //Set Kilt public key
    //await ethrDid.setAttribute('did/Ed25519/veri/base58', edKey, 365);
    return;
  };

  function getWindowExtensions(): InjectedWindowProvider[] {
    return Object.values(window.kilt);
  }
  const connectSporran = async () => {
    console.log("extension", getWindowExtensions());
    const extensions = await web3Enable("test");
    if (extensions.length === 0) {
      console.log("Sporran not installed");
      return;
    }
    const accounts = await web3Accounts();
    console.log(accounts);
    setSporranAcc(accounts[0].address);
    return;
  };

  const verifyConnection = async () => {
    await Kilt.init({ address: "wss://peregrine.kilt.io" });
    console.log("ello");
  };

  return (
    <div>
      <ConnectContainer
        connMetaMask={connectMetamask}
        connSporran={connectSporran}
        createDid={createTempAttr}
        addr={addr}
        sporranAddr={sporranAcc}
        verifyAccounts={verifyConnection}
      />
      <Course />
    </div>
  );
};
