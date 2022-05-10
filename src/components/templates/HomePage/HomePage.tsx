import React from 'react';
import { CourseCompleted } from '../CourseCompleted/CourseCompleted';
import * as _ from 'lodash';
import Spinner from '../../elements/Spinner/Spinner';
import { Header } from '../../modules/Header/Header';
import { Error } from '../Error/Error';
import { AddAttributeForm } from '../../modules/Forms/AddAttributeForm';
import { CourseForm } from '../../modules/Forms/CourseForm';
import { Navbar } from '../../modules/Navbar/Navbar';
import { StartCourseForm } from '../../modules/Forms/StartCourseForm';
import { Profile } from '../Profile/Profile';
import { Footer } from '../../modules/Footer/Footer';

interface IConnectProps {
  mmAddress: string | null;
  connectMetamask: () => void;
  courseCompleted: boolean;
  spinner: boolean;
  addEdKey: () => void;
  snapInitialized: boolean;
  edKey: boolean;
  hasVC: boolean;
  completeCourse: (name: string) => Promise<void>;
  spinnerMsg: string;
  switchView: (viewId: number) => void;
  view: number;
  startCourse: () => void;
  courseStarted: boolean;
}

export const HomePage: React.FC<IConnectProps> = ({
  mmAddress,
  connectMetamask,
  spinner,
  courseCompleted,
  addEdKey,
  snapInitialized,
  edKey,
  hasVC,
  completeCourse,
  spinnerMsg,
  switchView,
  view,
  startCourse,
  courseStarted,
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
          <Navbar switchView={switchView} />
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
                    {snapInitialized && !edKey && !spinner && courseStarted && (
                      <AddAttributeForm addAttribute={addEdKey} />
                    )}
                    {snapInitialized &&
                      snapInitialized &&
                      edKey &&
                      !hasVC &&
                      !spinner && (
                        <CourseForm completeCourse={completeCourse} />
                      )}
                    {snapInitialized && edKey && hasVC && (
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
