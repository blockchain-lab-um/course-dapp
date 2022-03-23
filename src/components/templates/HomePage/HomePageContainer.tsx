import React, { useState, useEffect, useCallback } from 'react';
import { EthrDID } from 'ethr-did';
import { Resolver, DIDDocument } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
const axios = require('axios');
import * as _ from 'lodash';
import { Web3Provider } from '@ethersproject/providers';
import { HomePage } from './HomePage';

const rpcUrl = 'https://rinkeby.infura.io/v3/6e751a2e5ff741e5a01eab15e4e4a88b';
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));
const snapId = 'local:http://localhost:8080/';
const vcIssuerId =
  'did:ethr:rinkeby:0x0241abd662da06d0af2f0152a80bc037f65a7f901160cfe1eb35ef3f0c532a2a4d';

export const HomePageContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [snapInitialized, setSnapInitialized] = useState<boolean>(false);
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [edKey, setEdKey] = useState<boolean>(false);
  const [hasVC, setHasVC] = useState<boolean>(false);
  const [spinnerMsg, setSpinnerMsg] = useState<string>('loading...');

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
        console.log('Checking if snap initialized...');
        //Check if Snap is initialized, if its not, it will initialize automatically
        console.log('Here');
        //const initialized = await isSnapInitialized();

        if (mmAddr != null) {
          //Check for existing EDKey attribute and VCs if storage is already initialized
          await checkForEdKey(mmAddr);
          await checkForVc(mmAddr);
        }
      } else {
        //Ask user to install Snap and initialize snap storage
        const res = await installSnap();
        if (res) {
          //await isSnapInitialized();
          if (mmAddr != null) {
            await checkForEdKey(mmAddr);
            await checkForVc(mmAddr);
          }
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

  const checkForVc = async (mmAddr: string) => {
    setSpinner(true);
    setSpinnerMsg('checking for existing vc...');
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
        setSpinnerMsg('loading...');
      }
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as Error).message || err);
      setSpinner(false);
      setSpinnerMsg('loading...');
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
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
    setSpinnerMsg('checking for existing delegate...');
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
      setSpinnerMsg('loading...');
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
  };

  const addEdKey = async () => {
    console.log('Add key');
    setSpinner(true);
    setSpinnerMsg('preparing delegate...');
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
          setSpinnerMsg('adding delegate...');
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
      setSpinnerMsg('loading...');
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
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
    setSpinnerMsg('checking if snap is initialized...');
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
      setSpinnerMsg('loading...');
      return true;
    } else {
      await initializeSnap();
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
    return false;
  };

  const installSnap = async () => {
    setSpinner(true);
    setSpinnerMsg('installing snap...');
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
        setSpinner(false);
        setSpinnerMsg('loading...');
        return true;
      }
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
    return false;
  };

  const initializeSnap = async () => {
    console.log('Initializing snap...');
    setSpinnerMsg('initializing snap...');
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
    setSpinnerMsg('loading...');
    return;
  };

  return (
    <HomePage
      mmAddress={mmAddress}
      connectMetamask={connectMetamask}
      spinner={spinner}
      courseCompleted={courseCompleted}
      addEdKey={addEdKey}
      snapInitialized={true}
      edKey={edKey}
      hasVC={hasVC}
      completeCourse={completeCourse}
      spinnerMsg={spinnerMsg}
    />
  );
};
