import type { CodeInfo } from "../types";

const getInvitationCode = async (props: {
  userId: string;
}): Promise<CodeInfo> => {
  const res = await fetch(`/api/code?userId=${props.userId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

const createInvitationCode = async (props: {
  userId: string;
  displayName: string;
}): Promise<CodeInfo> => {
  const res = await fetch("/api/code", {
    method: "POST",
    body: JSON.stringify(props),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export { getInvitationCode, createInvitationCode };
