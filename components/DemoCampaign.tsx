import { createInvitationCode, getInvitationCode } from "../utils/code";
import { useCallback, useEffect, useState } from "react";
import { useLiffContext } from "../context/LiffContext";
import type { ProfileProps } from "../types";

const DemoCampaign = ({ profile }: { profile?: ProfileProps }) => {
  const [invitationCode, setInvitationCode] = useState<string>();
  const { liff } = useLiffContext();

  const userId = profile?.userId;
  const displayName = profile?.displayName;

  const getOrCreateInvitationCode = useCallback(async () => {
    if (!userId || !displayName) {
      console.error("No userId or displayName");

      return;
    }

    let code;
    code = await getInvitationCode({ userId, displayName });

    if (!code) {
      code = await createInvitationCode({
        userId,
        displayName,
      });
    }

    setInvitationCode(code);
  }, [userId, displayName]);

  const shareLink = useCallback(() => {
    if (!liff) return;

    const context = liff.getContext();
    if (!context) return;

    const { endpointUrl } = context;
    const text = `hey, here’s an invite to special campaign. ${endpointUrl}?invitationCode=${invitationCode}`;

    liff
      ?.shareTargetPicker([
        {
          type: "text",
          text,
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
  }, [liff, invitationCode]);

  useEffect(() => {
    getOrCreateInvitationCode();
  }, [getOrCreateInvitationCode]);

  return (
    <div>
      <h4>Demo Campaign</h4>
      <div>Invitation Code: {invitationCode}</div>
      <button onClick={shareLink}>Share your link</button>
    </div>
  );
};

export default DemoCampaign;
