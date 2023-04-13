import { useEffect, useState } from "react";
import { useLiffContext } from "../context/LiffContext";

const Info = () => {
  const [friendship, setFriendship] = useState<{
    friendFlag: boolean;
  }>();
  const { liff } = useLiffContext();

  useEffect(() => {
    if (!liff) return;

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
      <h4>Info</h4>
      <div>Is Login: {liff?.isLoggedIn() ? "true" : "false"}</div>
      <div>OS: {liff?.getOS()}</div>
      <div>Language: {liff?.getLanguage()}</div>
      <div>In Liff browser: {liff?.isInClient() ? "true" : "false"}</div>
      <div>Line Liff Version: {liff?.getVersion()}</div>
      <div>Line Version: {liff?.getLineVersion()}</div>
      <div>
        Is OA&apos;s Friend: {friendship?.friendFlag ? "true" : "false"}
      </div>
    </div>
  );
};

export default Info;
