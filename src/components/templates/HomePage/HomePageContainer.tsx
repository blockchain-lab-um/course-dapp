import React, { useState } from 'react';
const axios = require('axios');
import { HomePage } from './HomePage';
import { SSISnapApi } from '@blockchain-lab-um/ssi-snap-types';
import { initiateSSISnap } from '../../../utils/snap';

const snapId = process.env.SNAP_ID;
const backend_url = process.env.BACKEND_URL;
const vcIssuerId = process.env.VC_ISSUER as string;
console.log('BACKEND', backend_url, snapId, vcIssuerId);

export const HomePageContainer: React.FC = () => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [hasVC, setHasVC] = useState<boolean>(false);
  const [spinnerMsg, setSpinnerMsg] = useState<string>('loading...');
  const [view, setView] = useState<number>(0);
  const [courseStarted, setCourseStarted] = useState<boolean>(false);
  const [api, setApi] = useState<SSISnapApi | undefined>(undefined);

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
      const result = await initiateSSISnap(snapId as string);
      if (result.isSnapInstalled) {
        const api = await result.snap?.getSSISnapApi();
        setApi(api);
      }
    }
    return;
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
      if (api) {
        console.log('API', api);
        console.log('Getting VCs...');
        const vcs = await api.getVCs({});
        console.log(vcs);
        try {
          if (vcs.length > 0) {
            vcs.map((vc: any) => {
              console.log(
                vc.credentialSubject.id.split(':')[3].toString().toUpperCase(),
                mmAddr,
                vcIssuerId.toUpperCase(),
                vc.issuer.id.toString().toUpperCase()
              );
              if (
                vc.credentialSubject.id
                  .split(':')[3]
                  .toString()
                  .toUpperCase() === mmAddr.toUpperCase() &&
                vc.issuer.id.toString().toUpperCase() ===
                  vcIssuerId.toUpperCase()
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
      if (api) {
        const res = await api.saveVC(VC);
        console.log(res);
      }
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
    if (api) {
      const vcs = await api.getVCs({});
      console.log(vcs);
      if (vcs.length > 0) {
        const vc_id = vcs[0].key;
        console.log(vc_id);
        if (result && result.domain && result.challenge) {
          try {
            const res = await api.getVP(vc_id, result.domain, result.challenge);
            console.log(res);

            if (
              (await verifyVP(res, result.domain, result.challenge)) != false
            ) {
              setView(2);
              return true;
            }
          } catch (e) {
            console.log(e);
            setSpinner(false);
          }
          setSpinner(false);
          return false;
        }
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
      hasVC={hasVC}
      completeCourse={completeCourse}
      spinnerMsg={spinnerMsg}
      switchView={switchView}
      view={view}
      startCourse={startCourse}
      courseStarted={courseStarted}
      openSecretRoom={openSecretRoom}
      api={api as SSISnapApi}
    />
  );
};
