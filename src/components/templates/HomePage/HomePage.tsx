import React from 'react';
import { CourseCompleted } from '../CourseCompleted/CourseCompleted';
import * as _ from 'lodash';
import Spinner from '../../elements/Spinner/Spinner';
import { Header } from '../../modules/Header/Header';
import { Error } from '../Error/Error';
import { CourseForm } from '../../modules/Forms/CourseForm';
import { Navbar } from '../../modules/Navbar/Navbar';
import { StartCourseForm } from '../../modules/Forms/StartCourseForm';
import { Profile } from '../Profile/Profile';
import { Footer } from '../../modules/Footer/Footer';
import { SecretRoom } from '../SecretRoom/SecretRoom';

interface IConnectProps {
  mmAddress: string | null;
  connectMetamask: () => void;
  courseCompleted: boolean;
  spinner: boolean;
  snapInitialized: boolean;
  hasVC: boolean;
  completeCourse: (name: string) => Promise<void>;
  spinnerMsg: string;
  switchView: (viewId: number) => void;
  view: number;
  startCourse: () => void;
  courseStarted: boolean;
  openSecretRoom: () => void;
}

export const HomePage: React.FC<IConnectProps> = ({
  mmAddress,
  connectMetamask,
  spinner,
  courseCompleted,
  snapInitialized,
  hasVC,
  completeCourse,
  spinnerMsg,
  switchView,
  view,
  startCourse,
  courseStarted,
  openSecretRoom,
}) => {
  if (!window.ethereum) {
    return <Error msg={'MetaMask not installed!'} />;
  } else {
    return (
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Header
            address={mmAddress}
            connected={mmAddress != null}
            connMetaMask={connectMetamask}
          />
          <Navbar
            switchView={switchView}
            hasVC={hasVC}
            openSecretRoom={openSecretRoom}
          />
          <div>
            {view == 0 && (
              <div className="flex justify-center pt-5">
                {mmAddress == null && !spinner && (
                  <div className="text-2xl pt-32">
                    Connect to the MetaMask to start the Course!
                  </div>
                )}
                {mmAddress != null && !spinner && courseStarted == false && (
                  <StartCourseForm startCourse={startCourse} />
                )}
                {courseCompleted && courseStarted && <CourseCompleted />}
                {mmAddress != null && !courseCompleted && (
                  <>
                    <Spinner loading={spinner} msg={spinnerMsg} />
                    {snapInitialized &&
                      snapInitialized &&
                      !hasVC &&
                      !spinner &&
                      courseStarted && (
                        <CourseForm completeCourse={completeCourse} />
                      )}
                    {snapInitialized && hasVC && !spinner && (
                      <Error msg={'You already have a valid VC!'} />
                    )}
                  </>
                )}
              </div>
            )}
            {view == 1 && (
              <div className="flex justify-center pt-5">
                {mmAddress == null && (
                  <div className="text-2xl pt-32">
                    Connect to the MetaMask to view Profile!
                  </div>
                )}
                {mmAddress != null && <Profile mmAddress={mmAddress} />}
              </div>
            )}
            {view == 2 && <SecretRoom />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
