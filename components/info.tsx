import { Liff } from "@line/liff/exports";

const Info = ({
  liff,
  friendFlag,
}: {
  liff: Liff | null;
  friendFlag: boolean;
}) => {
  return (
    <div>
      <h4>Info</h4>
      <div>Is Login: {liff?.isLoggedIn() ? "true" : "false"}</div>
      <div>OS: {liff?.getOS()}</div>
      <div>Language: {liff?.getLanguage()}</div>
      <div>In Liff browser: {liff?.isInClient() ? "true" : "false"}</div>
      <div>Line Liff Version: {liff?.getVersion()}</div>
      <div>Line Version: {liff?.getLineVersion()}</div>
      <div>Is OA&apos;s Friend: {friendFlag ? "true" : "false"}</div>
    </div>
  );
};

export default Info;
