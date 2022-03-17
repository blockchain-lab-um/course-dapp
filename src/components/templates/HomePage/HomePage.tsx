import React from 'react';
import { CourseCompleted } from '../CourseCompleted/CourseCompleted';
import * as _ from 'lodash';
import Spinner from '../../elements/Spinner/Spinner';
import { Header } from '../../modules/Header/Header';
import { Error } from '../Error/Error';
import { AddAttributeForm } from '../../modules/Forms/AddAttributeForm';
import { CourseForm } from '../../modules/Forms/CourseForm';

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
}) => {
  if (!window.ethereum) {
    return <Error msg={'MetaMask not installed!'} />;
  } else {
    return (
      <div>
        <Header
          address={mmAddress}
          connected={mmAddress != null}
          connMetaMask={connectMetamask}
        />
        <div className="flex justify-center pt-20">
          {courseCompleted && <CourseCompleted />}
          {mmAddress != null && !courseCompleted && (
            <>
              <Spinner loading={spinner} msg={spinnerMsg} />
              {snapInitialized && !edKey && !spinner && (
                <AddAttributeForm addAttribute={addEdKey} />
              )}
              {snapInitialized && edKey && !hasVC && (
                <CourseForm completeCourse={completeCourse} />
              )}
              {snapInitialized && edKey && hasVC && (
                <Error msg={'You already have a valid VC!'} />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
};
