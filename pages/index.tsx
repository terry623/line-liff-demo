import { Liff } from "@line/liff/exports";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <div>
          <div>isLogin: {liff?.isLoggedIn() ? "true" : "false"}</div>
          <div>OS: {liff?.getOS()}</div>
          <div>Language: {liff?.getLanguage()}</div>
        </div>
      </main>
    </div>
  );
};

export default Home;