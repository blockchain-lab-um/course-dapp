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
    <div className={styles.container}>
      <Head>
        <title>Course DAPP</title>
        <script>window.kilt = &#123;&#125;;</script>
      </Head>
      <Wrapper />
    </div>
  );
};

export default Home;
