import { Liff } from "@line/liff/exports";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

type Friendship = {
  friendFlag: boolean;
};

type Props = {
  liff: Liff | null;
  liffError: string | null;
};

const Home: NextPage<Props> = ({ liff, liffError }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [friendFlag, setFriendFlag] = useState<Friendship | null>(null);
  const [url, setUrl] = useState<string | null>("?");

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
        setFriendFlag(result);
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
          <div>
            <h4>Info</h4>
            <div>Is Login: {liff?.isLoggedIn() ? "true" : "false"}</div>
            <div>OS: {liff?.getOS()}</div>
            <div>Language: {liff?.getLanguage()}</div>
            <div>In Liff browser: {liff?.isInClient() ? "true" : "false"}</div>
            <div>Line Liff Version: {liff?.getVersion()}</div>
            <div>Line Version: {liff?.getLineVersion()}</div>
            <div>
              Is OA&apos;s Friend: {friendFlag?.friendFlag ? "true" : "false"}
            </div>
          </div>
          <br />
          <div>
            <h4>Profile</h4>
            <div>userId: {profile?.userId}</div>
            <div>displayName: {profile?.displayName}</div>
            <div>statusMessage: {profile?.statusMessage}</div>
            {profile?.pictureUrl && (
              <img
                src={profile?.pictureUrl}
                alt="pictureUrl"
                className={styles.pictureUrl}
              />
            )}
          </div>
          <br />
          <h4>Actions</h4>
          <div className={styles.buttons}>
            {liff?.isLoggedIn() ? (
              <button
                onClick={() => {
                  // reload after logout.
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                  liff?.logout();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  liff?.login();
                }}
              >
                Login
              </button>
            )}
            <button
              onClick={() => {
                liff?.openWindow({
                  url: "https://www.dcard.tw/f",
                  external: true,
                });
              }}
            >
              Open external window
            </button>
            <button
              onClick={() => {
                liff?.closeWindow();
              }}
            >
              Close window
            </button>
            <button
              onClick={() => {
                liff
                  ?.shareTargetPicker([
                    {
                      type: "text",
                      text: "Hello, World!",
                    },
                  ])
                  .then(function (res) {
                    if (res) {
                      // succeeded in sending a message through TargetPicker
                      alert(`[${res.status}] Message sent!`);
                    } else {
                      // sending message canceled
                      alert("TargetPicker was closed!");
                    }
                  })
                  .catch(function () {
                    // something went wrong before sending a message
                    alert("something wrong happen");
                  });
              }}
            >
              Share target picker
            </button>
            <button
              onClick={() => {
                liff
                  ?.scanCodeV2()
                  .then((result) => {
                    setUrl(result.value);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Scan QR code
            </button>
            <button
              onClick={async () => {
                try {
                  let res = await fetch("/api/code", {
                    method: "POST",
                    body: JSON.stringify({
                      userId: profile?.userId,
                      code: uuidv4(),
                    }),
                  });
                  res = await res.json();
                  alert("Create code success");
                } catch (error) {
                  alert("Create code fail");
                }
              }}
            >
              Create Code
            </button>
          </div>
          <br />
          <div>Scan result: {url}</div>
          <br />
        </div>
      </main>
    </div>
  );
};

export default Home;
