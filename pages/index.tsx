import { Liff } from "@line/liff/exports";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Info from "../components/info";
import Profile, { ProfileProps } from "../components/profile";
import Actions from "../components/actions";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  const [profile, setProfile] = useState<ProfileProps>();
  const [friendship, setFriendship] = useState<{
    friendFlag: boolean;
  }>();

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

    liff
      .getFriendship()
      .then((result) => {
        setFriendship(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [liff]);

  return (
    <div>
      <Head>
        <title>LIFF App</title>
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
          <Info liff={liff} friendFlag={!!friendship?.friendFlag} />
          <Profile profile={profile} />
          <Actions liff={liff} userId={profile?.userId} />
        </div>
      </main>
    </div>
  );
};

export default Home;
