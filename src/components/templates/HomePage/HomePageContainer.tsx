import React, { useState, useEffect, useCallback } from 'react';
import { EthrDID } from 'ethr-did';
import { Resolver, DIDDocument } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
const axios = require('axios');
import * as _ from 'lodash';
import { Web3Provider } from '@ethersproject/providers';
import { HomePage } from './HomePage';
import { Response } from '../../../utils/interfaces';

const rpcUrl = process.env.RPC_URL;
const didResolver = new Resolver(getResolver({ rpcUrl, name: 'rinkeby' }));

const snapId = process.env.SNAP_ID;
const backend_url = process.env.BACKEND_URL;
const vcIssuerId = process.env.VC_ISSUER as string;
console.log('BACKEND', backend_url, snapId, vcIssuerId);

export const HomePageContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [edKey, setEdKey] = useState<boolean>(true);
  const [hasVC, setHasVC] = useState<boolean>(false);
  const [spinnerMsg, setSpinnerMsg] = useState<string>('loading...');
  const [view, setView] = useState<number>(0);
  const [courseStarted, setCourseStarted] = useState<boolean>(false);

  const switchView = (viewId: number) => {
    if (view != viewId) {
      setView(viewId);
    }
  };

  const connectMetamask = async () => {
    let mmAddr = null;
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: React.SetStateAction<string | null>[]) => {
          console.log('Setting MM address!');
          mmAddr = result[0];
          setMmAddress(mmAddr);
        });
      console.log('Checking for snap...');
      if (snapId && (await isSnapInstalled(snapId))) {
        console.log('Snap installed.');
      } else {
        const res = await installSnap();
        if (res) {
        } else {
          console.log('Something went wrong...');
        }
      }
    } else {
      console.log('Install Metamask');
    }
    return;
  };

  async function isSnapInstalled(
    snapOrigin: string,
    version?: string
  ): Promise<boolean> {
    console.log(await getWalletSnaps());
    try {
      return !!Object.values(await getWalletSnaps()).find(
        (permission) =>
          permission.id === snapOrigin &&
          (!version || permission.version === version)
      );
    } catch (e) {
      console.log('Failed to obtain installed snaps', e);
      return false;
    }
  }

  const installSnap = async () => {
    setSpinner(true);
    setSpinnerMsg('installing snap...');
    if (snapId) {
      const res = await window.ethereum.request({
        method: 'wallet_enable',
        params: [
          {
            wallet_snap: { [snapId]: { version: 'latest' } },
          },
        ],
      });
      if (res) {
        const snap = res.snaps;
        //// TODO improve this
        if (snap[snapId]) {
          console.log('Sucessfuly installed.');
          setSpinner(false);
          setSpinnerMsg('loading...');
          return true;
        }
      }
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
    return false;
  };

  const startCourse = async () => {
    if (mmAddress != null && courseStarted == false) {
      console.log('Starting course...');
      setCourseStarted(true);
      await checkForVc(mmAddress);
    }
  };
  type GetSnapsResponse = {
    [k: string]: {
      permissionName?: string;
      id?: string;
      version?: string;
      initialPermissions?: { [k: string]: unknown };
    };
  };
  async function getWalletSnaps(): Promise<GetSnapsResponse> {
    return (await window.ethereum.request({
      method: 'wallet_getSnaps',
    })) as GetSnapsResponse;
  }

  const checkForVc = async (mmAddr: string) => {
    setSpinner(true);
    setSpinnerMsg('checking for existing vc...');
    console.log('Checking if user already has a valid VC..');
    try {
      const response = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'getVCs',
          },
        ],
      })) as Response;
      console.log(response);
      try {
        if (response.data.length > 0) {
          response.data.map((vc: any) => {
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

  const getChallenge = async () => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let challenge = await axios
      .post(backend_url + '/api/vc/generate-challenge', axiosConfig)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    console.log('Challenge', challenge);
    return challenge;
  };

  const verifyVP = async (vp: any, domain: string, challenge: string) => {
    setSpinner(true);
    setSpinnerMsg('Verifying validity of VP');
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let body = {
      vp: vp,
      challenge: challenge,
      domain: domain,
      subjectAddress: mmAddress,
    };
    let res = await axios
      .post(backend_url + '/api/vc/verify-vp', body, axiosConfig)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    console.log(res);
    setSpinner(false);
    return res;
  };

  const completeCourse = async (name: string) => {
    console.log(name, 'Completed the course!', mmAddress);
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let body = { name: name, id: 'did:ethr:rinkeby:' + mmAddress };
    let VC = await axios
      .post(backend_url + '/api/vc/issue-vc', body, axiosConfig)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    console.log(VC);

    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'saveVC',
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

  const openSecretRoom = async () => {
    setSpinner(true);
    setSpinnerMsg('Requesting VP');

    const result = await getChallenge();
    if (result && result.domain && result.challenge) {
      const res = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'getVP',
            params: [0, result.domain, result.challenge],
          },
        ],
      });
      console.log(res);
      if (!res.data) return false;
      if (!('error' in res.data)) {
        setSpinner(false);
        setSpinnerMsg('loading...');

        if (
          (await verifyVP(res.data, result.domain, result.challenge)) != false
        ) {
          setView(2);
          return true;
        }
        return false;
      }
    }
    setSpinner(false);
    setSpinnerMsg('loading...');
    return false;
  };

  return (
    <HomePage
      mmAddress={mmAddress}
      connectMetamask={connectMetamask}
      spinner={spinner}
      courseCompleted={courseCompleted}
      snapInitialized={true}
      edKey={edKey}
      hasVC={hasVC}
      completeCourse={completeCourse}
      spinnerMsg={spinnerMsg}
      switchView={switchView}
      view={view}
      startCourse={startCourse}
      courseStarted={courseStarted}
      openSecretRoom={openSecretRoom}
    />
  );
};
