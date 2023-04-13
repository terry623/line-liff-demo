import { v4 as uuidv4 } from "uuid";

const getInvitationCode = async (props: { userId: string }) => {
  const res = await fetch(`/api/code?userId=${props.userId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

const createInvitationCode = async (props: {
  userId: string;
  displayName: string;
}) => {
  const code = uuidv4();

  const res = await fetch("/api/code", {
    method: "POST",
    body: JSON.stringify({
      ...props,
      code,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return code;
};

export { getInvitationCode, createInvitationCode };
