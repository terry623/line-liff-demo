import { v4 as uuidv4 } from "uuid";

const getInvitationCode = async (props: { userId: string }) => {
  try {
    const response = await fetch(`/api/code?userId=${props.userId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createInvitationCode = async (props: {
  userId: string;
  displayName: string;
}) => {
  try {
    const code = uuidv4();

    await fetch("/api/code", {
      method: "POST",
      body: JSON.stringify({
        ...props,
        code,
      }),
    });

    return code;
  } catch (error) {
    console.error(error);
  }
};

export { getInvitationCode, createInvitationCode };
