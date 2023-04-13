import { v4 as uuidv4 } from "uuid";

type Props = {
  userId: string;
  displayName: string;
};

const getInvitationCode = async (props: Props) => {
  try {
    const response = await fetch(
      `/api/code?userId=${props.userId}&displayName=${props.displayName}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const createInvitationCode = async (props: Props) => {
  const code = uuidv4();

  try {
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
