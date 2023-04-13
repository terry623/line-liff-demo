import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Info from "../components/Info";
import Profile, { ProfileProps } from "../components/Profile";
import Actions from "../components/Actions";
import { useLiffContext } from "../context/LiffContext";
import { useEffect, useState } from "react";
import DemoCampaign from "../components/DemoCampaign";

const Home: NextPage = () => {
  const { liff, liffError } = useLiffContext();
  const [profile, setProfile] = useState<ProfileProps>();

  useEffect(() => {
    if (!liff) return;

    liff
      .getProfile()
      .then((result) => {
        setProfile(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [liff]);

  return (
    <div>
      <Head>
        <title>Dcard Demo App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {liff && <p>LIFF init succeeded</p>}
        {liffError && (
          <>
            <p>LIFF init failed</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <div>
          <DemoCampaign profile={profile} />
          <Info />
          <Profile profile={profile} />
          <Actions />
        </div>
      </main>
    </div>
  );
};

export default Home;
