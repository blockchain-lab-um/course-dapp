import React, { useState, useEffect, useCallback } from 'react';
import { ConnectContainer } from './ConnectContainer';
import { Course } from './Course';
import { EthrDID } from 'ethr-did';
import { Resolver, DIDDocument } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { ConnectMM } from './ConnectMetaMask/ConnectMM';
import { GetVC } from './Form/GetVC';
const axios = require('axios');
import * as _ from 'lodash';

const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));
const snapId = 'local:http://localhost:8080/';

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [snapInstalled, setSnapInstalled] = useState<Boolean>(false);
  const [snapInitialized, setSnapInitialized] = useState<Boolean>(false);
  const [courseCompleted, setCourseCompleted] = useState<Boolean>(false);

  const connectMetamask = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: React.SetStateAction<string | null>[]) => {
          setMmAddress(result[0]);
        });
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  const completeCourse = async (name: string) => {
    console.log(name, 'Completed the course!', mmAddress);
    //Get VC
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let body = { name: name, id: 'did:ethr:rinkeby:' + mmAddress };
    let VC = await axios
      .post('http://localhost:3333/api/vc/issue-vc', body, axiosConfig)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    console.log(VC);

    //Add VC to MM
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'save_vc',
            params: [VC],
          },
        ],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    setCourseCompleted(true);
  };

  const installSnap = async () => {
    console.log('Installing snap...');
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: 'wallet_enable',
        params: [
          {
            wallet_snap: { [snapId]: {} },
          },
        ],
      });
      console.log('Result:', res.snaps);
      if (res) {
        //TODO check if correct snap is installed
        const snap = res.snaps;
        console.log();
        if (!_.isEmpty(snap)) {
          setSnapInstalled(true);
          //TODO show buttons only if snap is initialized
          const initialized = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: [
              snapId,
              {
                method: 'isInitialized',
              },
            ],
          });
          console.log('Is initialized?', initialized);
          setSnapInitialized(initialized);
        }
      }
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  const createTempAttr = async (ethrDid: EthrDID) => {};
  //Test for state
  const sendMessage = async () => {
    try {
      const vc = {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject: {
          degree: {
            type: 'BachelorDegree',
            name: 'Baccalauréat en musiques numériques',
          },
        },
      };
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'hello',
            params: [vc],
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
  const initializeSnap = async () => {
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'init',
          },
        ],
      });
      console.log(response);
      setSnapInitialized(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    return;
  };

  const verifyConnection = async () => {
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'test_vp',
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
  if (courseCompleted) {
    return <GetVC />;
  } else {
    if (mmAddress !== null) {
      return (
        <div>
          {(!snapInstalled || snapInstalled) && (
            <div>
              <ConnectContainer
                installSnap={installSnap}
                sendMessage={sendMessage}
                verifyAccounts={verifyConnection}
              />
              <button onClick={initializeSnap}>init</button>
              TODO: Check for existing VC, Check if correct Snap is installed
            </div>
          )}
          {snapInitialized && <Course completeCourse={completeCourse} />}
        </div>
      );
    } else {
      return <ConnectMM connMetaMask={connectMetamask} />;
    }
  }
};
