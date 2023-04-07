import { Liff } from "@line/liff/exports";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [url, setUrl] = useState<string | null>("?");

  useEffect(() => {
    if (!liff) return;

    liff
      .getProfile()
      .then((profile) => {
        setProfile(profile);
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
          <div>Is Login: {liff?.isLoggedIn() ? "true" : "false"}</div>
          <div>OS: {liff?.getOS()}</div>
          <div>Language: {liff?.getLanguage()}</div>
          <div>Line Liff Version: {liff?.getVersion()}</div>
          <div>Line Version: {liff?.getLineVersion()}</div>
          <br />
          <div>
            Profile
            <div>userId: {profile?.userId}</div>
            <div>displayName: {profile?.displayName}</div>
            <div>statusMessage: {profile?.statusMessage}</div>
            <img
              src={
                "https://profile.line-scdn.net/0hteEdVHMZK0poHTku57tVNRhNKCBLbHJYTH1tKVoYJi0BK2oZEygzL1QZcS0BeD8ZFH1kKV9IdH9kDlwsdkvXfm8tdX1RKmgdTXlkqw"
              }
              alt="pictureUrl"
              className={styles.pictureUrl}
            />
          </div>
          <br />
          <div>
            <button
              onClick={() => {
                liff
                  ?.sendMessages([
                    {
                      type: "text",
                      text: "Hello, World!",
                    },
                  ])
                  .then(() => {
                    alert("Message sent");
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Send messages
            </button>
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
          </div>
          <br />
          <div>
            <div>Scan result: {url}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
