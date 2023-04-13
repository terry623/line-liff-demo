import { createInvitationCode, getInvitationCode } from "../utils/code";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLiffContext } from "../context/LiffContext";
import type { ProfileProps } from "../types";
import { createRelation, getRelation } from "../utils/relation";

type Relation = {
  inviterId: string;
  inviterName: string;
  inviterCode: string;
  inviteeCount: number;
};

const DemoCampaign = ({ profile }: { profile?: ProfileProps }) => {
  const [invitationCode, setInvitationCode] = useState<string>();
  const [inverterInfo, setInverterInfo] = useState<{
    id: string;
    name: string;
    code: string;
  }>();
  const [invitedCount, setInvitedCount] = useState<number>(0);
  const { liff } = useLiffContext();
  const { query } = useRouter();

  const userId = profile?.userId;
  const displayName = profile?.displayName;

  useEffect(() => {
    if (!userId) return;

    if (query.code) {
      const code = query.code as string;
      createRelation({ userId, code })
        .then((res: Relation) => {
          setInverterInfo({
            id: res.inviterId,
            name: res.inviterName,
            code: res.inviterCode,
          });
          setInvitedCount(res.inviteeCount);
        })
        .catch((err) => {
          alert(err);
        });

      return;
    } else {
      getRelation({ userId }).then((res: Relation) => {
        setInverterInfo({
          id: res.inviterId,
          name: res.inviterName,
          code: res.inviterCode,
        });
        setInvitedCount(res.inviteeCount);
      });
    }
  }, [query.code, userId]);

  const getOrCreateInvitationCode = useCallback(async () => {
    if (!userId || !displayName) {
      alert("No userId or displayName");

      return;
    }

    let code;
    code = await getInvitationCode({ userId });

    if (!code) {
      code = await createInvitationCode({
        userId,
        displayName,
      });
    }

    setInvitationCode(code);
  }, [userId, displayName]);

  const shareLink = useCallback(() => {
    const context = liff?.getContext();
    if (!context) return;

    const { liffId } = context;
    if (!liffId) return;
    const text = `hey, here’s an invite to special campaign. https://liff.line.me/${liffId}?code=${invitationCode}`;

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
      <div>Invited by {inverterInfo?.name}</div>
      <div>Inviter&apos;s code is {inverterInfo?.code}</div>
      <br />
      <div>Your invitation code: {invitationCode}</div>
      <div>Already invited {invitedCount} peoples</div>
      <button onClick={shareLink}>Invite friends</button>
    </div>
  );
};

export default DemoCampaign;
