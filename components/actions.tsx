import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { Liff } from "@line/liff/exports";
import { useState } from "react";

const Actions = ({ liff, userId }: { liff: Liff | null; userId?: string }) => {
  const [url, setUrl] = useState<string>("?");

  return (
    <>
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
                if (result.value) {
                  setUrl(result.value);
                }
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
                  userId,
                  code: uuidv4(),
                }),
              });
              res = await res.json();
              alert("Create invitation code success");
            } catch (error) {
              alert("Create invitation code fail");
            }
          }}
        >
          Create invitation code
        </button>
      </div>
      <div>Scan result: {url}</div>
    </>
  );
};

export default Actions;
