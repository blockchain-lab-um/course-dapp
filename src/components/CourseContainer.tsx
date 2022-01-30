import React, { useState, useEffect } from 'react';
import { ConnectContainer } from './ConnectContainer';
import { Course } from './Course';
import { ethers } from 'ethers';
import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
//import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
//import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

declare const window: any;
const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [spAddress, setSpAddress] = useState<string | null>(null);
  const [didEthrComplete, setDidEthrComplete] = useState<boolean | null>(null);
  const [addr, setAddr] = useState<string>('');
  const [sporranAcc, setSporranAcc] = useState<Array<string>>([]);

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

    //Set Kilt DID
    //await ethrDid.setAttribute('did/svc/KiltDid', 'Hello World', 365);
    return;
  };

  const connectSporran = async () => {
    //const extensions = await web3Enable('test');
    /*if (extensions.length === 0) {
      console.log('Sporran not installed');
      return;
    }
    const accounts = await web3Accounts();
    console.log(accounts);
    //setSporranAcc(accounts);*/
    return;
  };

  return (
    <div>
      <ConnectContainer
        connMetaMask={connectMetamask}
        connSporran={connectSporran}
        createDid={createTempAttr}
        addr={addr}
      />
      <Course />
    </div>
  );
};
