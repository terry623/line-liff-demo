import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useLiffContext } from "../context/LiffContext";

const Actions = () => {
  const [url, setUrl] = useState<string>("?");
  const { liff } = useLiffContext();

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
              url: "https://www.google.com/",
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
              .then((res) => {
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
      </div>
      <div>Scan result: {url}</div>
    </>
  );
};

export default Actions;
