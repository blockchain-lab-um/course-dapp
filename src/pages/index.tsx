import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

const Wrapper = dynamic(
  () => {
    return import('./Wrapper');
  },
  { ssr: false }
);

declare global {
  interface Window {
    kilt: any;
    ethereum: any;
  }
}
const Home: NextPage = () => {
  return (
    <div className="bg-green min-h-screen font-mono">
      <Head>
        <title>Solidity Course</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Wrapper />
    </div>
  );
};

export default Home;
