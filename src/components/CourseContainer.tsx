import React, { useState, useEffect, useCallback } from 'react';
import { ConnectContainer } from './ConnectContainer';
import { Course } from './Course';
import { EthrDID } from 'ethr-did';
import { Resolver, DIDDocument } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));
const snapId = 'local:http://localhost:8080/';

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);

  const connectMetamask = async () => {
    if (window.ethereum) {
      // window.ethereum
      //   .request({ method: 'eth_requestAccounts' })
      //   .then((result: React.SetStateAction<string>[]) => {
      //     setAddr(result[0]);
      //     //Check for DID:ETHR KILT attr
      //   });
      await window.ethereum.request({
        method: 'wallet_enable',
        params: [
          {
            wallet_snap: { [snapId]: {} },
          },
        ],
      });
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  const createTempAttr = async (ethrDid: EthrDID) => {};
  //Test for state
  const sendMessage = async () => {
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'hello',
            params: [
              `vc: {
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              type: ['VerifiableCredential'],
              credentialSubject: {
                degree: {
                  type: 'BachelorDegree',
                  name: 'Baccalauréat en musiques numériques'
                }`,
            ],
          },
        ],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    return;
  };
  //Test for returning messages
  const verifyConnection = async () => {
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'get_vp',
          },
        ],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    return;
  };

  return (
    <div>
      <ConnectContainer
        connMetaMask={connectMetamask}
        sendMessage={sendMessage}
        verifyAccounts={verifyConnection}
      />
      <Course />
    </div>
  );
};
