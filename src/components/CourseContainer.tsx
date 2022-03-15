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
import { Web3Provider } from '@ethersproject/providers';
import Spinner from './Utils/Spinner';
import useStateWithCallback from 'use-state-with-callback';

const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));
const snapId = 'local:http://localhost:8080/';
const vcIssuerId =
  'did:ethr:rinkeby:0x0241abd662da06d0af2f0152a80bc037f65a7f901160cfe1eb35ef3f0c532a2a4d';

export const CourseContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [snapInstalled, setSnapInstalled] = useState<Boolean>(false);
  const [snapInitialized, setSnapInitialized] = useState<Boolean>(false);
  const [courseCompleted, setCourseCompleted] = useState<Boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [edKey, setEdKey] = useState<boolean>(false);
  const [hasVC, setHasVC] = useState<boolean>(false);

  const connectMetamask = async () => {
    let mmAddr = null;
    // Get MM account
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: React.SetStateAction<string | null>[]) => {
          console.log('Setting MM address!');
          mmAddr = result[0];
          setMmAddress(mmAddr);
        });
      console.log('Checking for snap...');
      //Check if Snap is Installed
      if (await isSnapInstalled()) {
        console.log('Snap installed.');
        setSnapInstalled(true);
        console.log('Checking if snap initialized...');
        //Check if Snap is initialized, if its not, it will initialize automatically
        const initialized = await isSnapInitialized();
        if (mmAddr != null && initialized) {
          //Check for existing EDKey attribute and VCs if storage is already initialized
          await checkForEdKey(mmAddr);
          await checkForVc(mmAddr);
        }
      } else {
        //Ask user to install Snap and initialize snap storage
        const res = await installSnap();
        if (res) {
          await isSnapInitialized();
          // Checking for ED key and existing VCs probably not needed, since storage needs to be reset
          // if (mmAddr != null) {
          //   await checkForEdKey(mmAddr);
          //   await checkForVc(mmAddr);
          // }
        } else {
          console.log('Something went wrong...');
        }
      }
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  const isSnapInstalled = async () => {
    const result = await window.ethereum.request({ method: 'wallet_getSnaps' });

    if (result[snapId]) return true;
    else return false;
  };

  const getVCs = async () => {
    console.log('Getting vcs..');
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'get_vcs',
          },
        ],
      });
      console.log(response);
      try {
        if (response.length > 0) {
          response.map((vc: any) => {
            if (
              vc.credentialSubject.id.split(':')[3].toString().toUpperCase() ===
                mmAddress?.toUpperCase() &&
              vc.issuer.id.toString().toUpperCase() === vcIssuerId.toUpperCase()
            ) {
              console.log('Has valid VC!');
              setHasVC(true);
            }
          });
        }
      } catch (e) {
        console.log('No valid VCs found!', e);
      }
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    return;
  };

  const checkForVc = async (mmAddr: string) => {
    setSpinner(true);
    console.log('Checking if user already has a valid VC..');
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'get_vcs',
          },
        ],
      });
      console.log(response);
      try {
        if (response.length > 0) {
          response.map((vc: any) => {
            console.log(
              vc.credentialSubject.id.split(':')[3].toString().toUpperCase(),
              mmAddr,
              vcIssuerId.toUpperCase(),
              vc.issuer.id.toString().toUpperCase()
            );
            if (
              vc.credentialSubject.id.split(':')[3].toString().toUpperCase() ===
                mmAddr.toUpperCase() &&
              vc.issuer.id.toString().toUpperCase() === vcIssuerId.toUpperCase()
            ) {
              console.log('Valid VC found!');
              setHasVC(true);
            }
          });
        }
      } catch (e) {
        console.log('No valid VCs found!', e);
        setSpinner(false);
      }
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
      setSpinner(false);
    }
    setSpinner(false);
  };

  const getVp = async () => {
    console.log('Getting vp for id: 0...');
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'get_vp',
            params: [0],
          },
        ],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
  };

  const resolveDidEthr = async (mmAddr?: string) => {
    const provider = new Web3Provider((window as any).ethereum);
    const chainNameOrId = (await provider.getNetwork()).chainId;
    console.log(mmAddress, mmAddr, provider, chainNameOrId);
    let addr = mmAddress;
    if (mmAddr) addr = mmAddr;
    const ethrDid = new EthrDID({
      identifier: addr as string,
      provider,
      chainNameOrId,
    });
    const didDocument = (await didResolver.resolve(ethrDid.did)).didDocument;
    console.log('DID:ETHR DID DOCUMENT:', didDocument);
    let gasPrice = (await provider.getGasPrice()).toNumber() * 2;
    return { ethrDid, didDocument, gasPrice };
  };

  const checkForKey = async (
    didDocument: DIDDocument,
    vcKey: string
  ): Promise<boolean> => {
    const veriKeys = didDocument?.verificationMethod;
    let retVal = false;
    if (veriKeys != null) {
      console.log('veri keys', veriKeys);
      veriKeys.map((key) => {
        if (
          key.publicKeyHex?.toString().toUpperCase() ===
          vcKey.substring(2).toUpperCase()
        ) {
          retVal = true;
        }
      });
    }
    return retVal;
  };

  const checkForEdKey = async (mmAddr: string) => {
    console.log('Checking if key already exists...');
    setSpinner(true);
    const { ethrDid, didDocument, gasPrice } = await resolveDidEthr(mmAddr);

    let hexKey = '';
    try {
      hexKey = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'getVCAddress',
          },
        ],
      });
      console.log('Hex key:', hexKey);

      if (didDocument) {
        const res = await checkForKey(didDocument, hexKey);
        if (!res) {
          console.log('Key not implemented yet');
          setEdKey(false);
        } else {
          console.log('Key already exists!');
          setEdKey(true);
        }
      }
    } catch (e) {
      console.error(e);
      alert('Problem happened: ' + (e as Error).message || e);
      setSpinner(false);
    }
    setSpinner(false);
  };

  const addEdKey = async () => {
    console.log('Add key');
    setSpinner(true);
    // Check if key already exists...

    const { ethrDid, didDocument, gasPrice } = await resolveDidEthr();

    //Request ED key from MM Snap
    let hexKey = '';
    try {
      hexKey = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'getVCAddress',
          },
        ],
      });
      console.log('Hex key:', hexKey);

      //Check if attribute already exists
      if (didDocument) {
        const res = await checkForKey(didDocument, hexKey);
        if (!res) {
          //Add key as auth key using addAttribute from ethr-did

          let gasLimit = 100000;

          const txOptions = { gasPrice, gasLimit };
          const attRes = await ethrDid.setAttribute(
            'did/pub/Ed25519/veriKey/hex',
            hexKey,
            86400,
            undefined,
            txOptions
          );
          console.log('Adding attribute res', attRes);
          // TODO Error res is false...
          if (attRes) {
            console.log('Sucessfuly added Ed Key!');
            setEdKey(true);
          }
          //await ethrDid.setAttribute('did/pub/Ed25519/veriKey/base58', edKey);
        } else {
          console.log('Attribute already exists');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
      setSpinner(false);
    }
    setSpinner(false);
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

  const isSnapInitialized = async () => {
    setSpinner(true);
    console.log('Checking if snap is initialized...');
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
    if (initialized) {
      console.log('Snap properly initialized');
      setSnapInitialized(true);
      setSpinner(false);
      return true;
    } else {
      await initializeSnap();
    }
    setSpinner(false);
    return false;
  };

  const installSnap = async () => {
    setSpinner(true);
    const res = await window.ethereum.request({
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: { [snapId]: {} },
        },
      ],
    });
    if (res) {
      const snap = res.snaps;
      if (snap[snapId]) {
        console.log('Sucessfuly installed.');
        setSnapInstalled(true);
        setSpinner(false);
        return true;
      }
    }
    setSpinner(false);
    return false;
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
    console.log('Initializing snap...');
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
      console.log('Snap initialized properly.');
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
    }
    return;
  };

  const verifyConnection = async () => {
    const result = await window.ethereum.request({ method: 'wallet_getSnaps' });

    console.log(result[snapId]);
  };
  if (!window.ethereum) {
    return (
      <div>
        <h1>MetaMask not Installed!</h1>
      </div>
    );
  }
  if (courseCompleted) {
    return <GetVC />;
  } else {
    if (mmAddress !== null) {
      return (
        <div>
          <Spinner loading={spinner} />
          {false && (
            <div>
              <ConnectContainer
                installSnap={installSnap}
                sendMessage={sendMessage}
                verifyAccounts={verifyConnection}
                addKey={addEdKey}
                getVcs={getVCs}
                getVp={getVp}
              />
            </div>
          )}
          {snapInitialized && !edKey && !spinner && (
            <div className="div-card">
              <div>
                <h3 className="text-xl mb-10">
                  To ensure everything is working smoothly, add custom delegate
                  to your MetaMask account!
                </h3>
              </div>
              <div>
                <button className="custom-button" onClick={addEdKey}>
                  Add Delegate Attribute
                </button>
              </div>
            </div>
          )}
          {snapInitialized && edKey && !hasVC && (
            <Course completeCourse={completeCourse} />
          )}
          {snapInitialized && edKey && hasVC && (
            <div className="grid justify-items-center">
              <h1 className="text-2xl">You already have a valid VC!</h1>
            </div>
          )}
        </div>
      );
    } else {
      return <ConnectMM connMetaMask={connectMetamask} />;
    }
  }
};
