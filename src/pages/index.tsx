import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
//import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import dynamic from "next/dynamic";

const Wrapper = dynamic(
  () => {
    return import("./Wrapper");
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
      <Wrapper />
    </div>
  );
};

export default Home;
