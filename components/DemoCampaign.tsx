import { createInvitationCode, getInvitationCode } from "../utils/code";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLiffContext } from "../context/LiffContext";
import type { ProfileProps } from "../types";
import { createRelation, getRelation } from "../utils/relation";
import { ErrorCode } from "../constants";

const DemoCampaign = ({ profile }: { profile: ProfileProps }) => {
  const [invitationCode, setInvitationCode] = useState<string>();
  const [inverterInfo, setInverterInfo] = useState<{
    id: string;
    name: string;
    code: string;
  }>();
  const [invitedCount, setInvitedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { liff } = useLiffContext();
  const { query } = useRouter();

  const { userId, displayName } = profile;

  useEffect(() => {
    if (!userId) return;

    if (query.invitationCode) {
      const code = query.invitationCode as string;
      createRelation({ userId, code })
        .then((res) => {
          setInvitedCount(res.inviteeCount);

          if (!res.inviterInfo) return;

          setInverterInfo({
            id: res.inviterInfo.id,
            name: res.inviterInfo.name,
            code: res.inviterInfo.code,
          });
        })
        .catch((err) => {
          alert(err);
        });

      return;
    } else {
      getRelation({ userId }).then((res) => {
        setInvitedCount(res.inviteeCount);

        if (!res.inviterInfo) return;

        setInverterInfo({
          id: res.inviterInfo.id,
          name: res.inviterInfo.name,
          code: res.inviterInfo.code,
        });
      });
    }
  }, [query.invitationCode, userId]);

  const getOrCreateInvitationCode = useCallback(async () => {
    setIsLoading(true);

    if (!userId || !displayName) {
      return;
    }

    try {
      const { code } = await getInvitationCode({ userId });
      setInvitationCode(code);
    } catch (err: unknown) {
      if (!(err instanceof Error)) return;
      if (err.message === ErrorCode.CodeNotFound) {
        const { code } = await createInvitationCode({ userId, displayName });
        setInvitationCode(code);
      }
    }

    setIsLoading(false);
  }, [userId, displayName]);

  const shareLink = useCallback(() => {
    const context = liff?.getContext();
    if (!context) return;

    const { liffId } = context;
    if (!liffId) return;
    const text = `hey, here’s an invite to special campaign. https://liff.line.me/${liffId}?invitationCode=${invitationCode}`;

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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Invited by {inverterInfo?.name}</div>
          <div>Inviter&apos;s code is {inverterInfo?.code}</div>
          <br />
          <div>Your invitation code: {invitationCode}</div>
          <div>Already invited {invitedCount} peoples</div>
          <button onClick={shareLink}>Invite friends</button>
        </>
      )}
    </div>
  );
};

export default DemoCampaign;
